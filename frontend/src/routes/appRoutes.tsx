import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/School';
import EqualizerOutlinedIcon from '@mui/icons-material/Equalizer';
import SubjectOutlinedIcon from '@mui/icons-material/Subject';
import { Home, ReportRounded, Summarize } from "@mui/icons-material";
import AddNewStudent from "../pages/students/AddNewStudent";
import StudentsLayout from "../pages/students/StudentsLayout";
import ViewStudents from "../pages/students/ViewStudents";
import StreamPageLayout from "../pages/streams/StreamPageLayout";
import AddNewStream from "../pages/streams/AddStream";
import ViewStreams from "../pages/streams/ViewStreams";
import SubjectsPageLayout from "../pages/subjects/SubjectsPageLayout";
import AddNewSubject from "../pages/subjects/AddNewSubject";
import ViewSubjects from "../pages/subjects/ViewSubjects";
import ViewStreamSubjects from "../pages/streams/ViewStreamSubjects";
import AddSubjectToStream from "../pages/streams/AddSubjectToStream";
import GradePageLayout from "../pages/grades/GradePageLayout";
import TranscriptsPageLayout from "../pages/transcripts/TranscriptPageLayout";

const appRoutes: RouteType[] = [
 
  {
    path: "/",
    element: <HomePage />,
    state: "home",
    visibleOn:["Secretary","Director","Admin"],
    sidebarProps: {
      displayText: "Home",
      icon: <Home />
    },
  },
  {
    path: "/students",
    element: <StudentsLayout />,
    state: "students",
    visibleOn:["Secretary","Director"],
    sidebarProps: {
      displayText: "Students",
      icon: <PeopleAltOutlinedIcon />
    },
    child: [
      {
        path: "/students/view",
        element: <ViewStudents />,
        state: "students.view",
        visibleOn:["Secretary","Director"],
        sidebarProps: {
          displayText: "View"
        },
      },
      {
        path: "/students/add",
        element: <AddNewStudent />,
        state: "students.add",
        visibleOn:["Secretary"],
        sidebarProps: {
          displayText: "Add"
        }
      },
      {
        path: "/students/edit/:studentId",
        element: <HomePage />,
        state: "students.edit",
        visibleOn:["Secretary"],
      },
      {
        path: "/students/remove/:studentId",
        element: <HomePage />,
        state: "students.remove",
        visibleOn:["Secretary","Director"],
      },
    ]
  },
  {
    path: "/stream",
    element: <StreamPageLayout />,
    state: "stream",
    visibleOn:["Director"],
    sidebarProps: {
      displayText: "Stream",
      icon: <SchoolOutlinedIcon />
    },
    child: [
      {
        path: "/stream/view",
        element: <ViewStreams />,
        state: "stream.view",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "View"
        },
      },
      {
        path: "/stream/subjects/:streamId",
        element: <ViewStreamSubjects />,
        state: "stream.streamId",
        visibleOn:["Director"],
        
      },
      {
        path: "/stream/subjects/add/:streamId",
        element: <AddSubjectToStream />,
        state: "stream.add.id",
        visibleOn:["Director"],
      },
      {
        path: "/stream/add",
        element: <AddNewStream />,
        state: "stream.add",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "Add"
        }
      },
      {
        path: "/stream/edit",
        element: <HomePage />,
        state: "stream.edit",
        visibleOn:["Director"],
      },
      {
        path: "/stream/remove",
        element: <HomePage />,
        state: "stream.remove",
        visibleOn:["Director"],
      },
    ]
  },
  {
    path: "/grades",
    element: <GradePageLayout />,
    state: "grades",
    visibleOn:["Secretary","Director"],
    sidebarProps: {
      displayText: "Grades",
      icon: <EqualizerOutlinedIcon />
    },
    child: [
      {
        path: "/grades/add",
        element: <HomePage />,
        state: "grades.add",
        visibleOn:["Secretary"],
        sidebarProps: {
          displayText: "Add"
        }
      },
      {
        path: "/grades/edit/:studentId/:gradeId",
        element: <HomePage />,
        state: "grades.edit",
        visibleOn:["Secretary"],
       
      },
      {
        path: "/grades/remove/:studentId/:gradeId",
        element: <HomePage />,
        state: "grades.remove",
        visibleOn:["Secretary"],
        
      },
    ]
  },
  {
    path: "/transcript",
    element: <TranscriptsPageLayout />,
    state: "transcript",
    visibleOn:["Secretary","Director"],
    sidebarProps: {
      displayText: "Transcripts",
      icon: <Summarize />
    },
    child: [
      {
        path: "/transcript/view/:studentId",
        element: <HomePage />,
        state: "transcript.view",
        visibleOn:["Secretary","Director"],
        sidebarProps: {
          displayText: "View"
        }
      },
    ]
  },
  {
    path: "/subjects",
    element: <SubjectsPageLayout />,
    state: "subjects",
    visibleOn:["Director"],
    sidebarProps: {
      displayText: "Subjects",
      icon: <SubjectOutlinedIcon />
    },
    child: [
      {
        path: "/subjects/view",
        element: <ViewSubjects />,
        state: "subjects.view",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "View"
        },
      },
      {
        path: "/subjects/add",
        element: <AddNewSubject />,
        state: "subjects.add",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "Add"
        }
      },
      {
        path: "/subjects/edit/:subjectId",
        element: <HomePage />,
        state: "subjects.edit",
        visibleOn:["Director"],
      },
      {
        path: "/subjects/remove/:subjectId",
        element: <HomePage />,
        state: "subjects.remove",
        visibleOn:["Director"],
      },
    ]
  },
   {
    path: "/reports",
    element: <AddNewStudent />,
    state: "reports",
    visibleOn:["Director","Secretary"],
    sidebarProps: {
      displayText: "Reports",
      icon: <ReportRounded />
    }
  },
];

export default appRoutes;
