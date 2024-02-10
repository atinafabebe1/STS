const Transcript = require('../models/transcript');
const Grade = require('../models/grade');
const Student = require('../models/student');

async function calculateTranscriptStatistics(req, res) {
    try {
        const { year } = req.params;
        const transcriptData = await generateTranscriptData(year);
        await saveTranscriptData(transcriptData);

        res.status(200).json({ message: 'Transcript statistics calculated successfully.' });
    } catch (error) {
        console.error('Error calculating transcript statistics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function generateTranscriptData(year) {
    const transcriptData = [];

    const students = await fetchStudentsForYear(year);

    for (const student of students) {
        const grades = await fetchGradesForStudentAndYear(student._id, year);

        if (grades.length === 0) {
            console.warn(`No grades found for student ${student.fullName}`);
            continue;
        }

        const totalMarks = grades.reduce((total, grade) => total + grade.marks, 0); // For each semister
        const average = totalMarks / grades.length;
        const rank = await calculateRank(student.stream, student.section, average, student, year); // pass studentId instead of student

        transcriptData.push({
            student: student._id,
            academicYear: year,
            totalMarks,
            grades,
            average,
            rank
        });
    }

    return transcriptData;
}

async function fetchStudentsForYear(year) {
    return await Student.find({
        dateOfAdmission: { $lte: new Date(`${year}-12-31`) }
    });
}

async function fetchGradesForStudentAndYear(studentId, year) {

    const grades = await Grade.find({
        student: studentId,
        academicYear: year
    });

    return grades
}

async function calculateRank(streamId, section, studentAverage, student, year) {
    try {
        const otherStudents = await fetchOtherStudentsForRanking(student._id, streamId, section, year);
        const otherStudentAverages = await calculateAveragesForOtherStudents(otherStudents);

        const sortedAverages = [...otherStudentAverages, studentAverage].sort((a, b) => b - a); // remove duplicate

        //     [1,2,4,6,8,9]  9 - 1 / 8 -2 / 6-3 / 4 -4
        const rank = sortedAverages.indexOf(studentAverage) + 1; // 

        return rank;
    } catch (error) {
        console.error('Error calculating rank:', error);
        return 0;
    }
}

async function fetchOtherStudentsForRanking(studentId, streamId, section, year) {
    return await Student.find({
        stream: streamId,
        section,
        _id: { $ne: studentId },
        dateOfAdmission: { $lte: new Date(`${year}-12-31`) }
    });
}

async function calculateAveragesForOtherStudents(otherStudents) {
    return await Promise.all(
        otherStudents.map(async (otherStudent) => {
            const otherStudentGrades = await fetchGradesForStudent(otherStudent._id);
            if (otherStudentGrades.length === 0) return 0;
            return otherStudentGrades.reduce((total, grade) => total + grade.marks, 0) / otherStudentGrades.length;
        })
    );
}

async function fetchGradesForStudent(studentId) {
    return await Grade.find({ student: studentId });
}

async function saveTranscriptData(transcriptData) {
    return await Transcript.insertMany(transcriptData);
}

async function getAlltranscript(req, res) {
    res.status(200).json(res.advancedResults);
}

module.exports = {
    calculateTranscriptStatistics,
    getAlltranscript
};
