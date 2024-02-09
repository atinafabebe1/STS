import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/School';
import EqualizerOutlinedIcon from '@mui/icons-material/Equalizer';
import SubjectOutlinedIcon from '@mui/icons-material/Subject';
import { Home, ReportRounded } from "@mui/icons-material";
import AddNewStudent from "../pages/students/AddNewStudent";
import StudentsLayout from "../pages/students/StudentsLayout";
import ViewStudents from "../pages/students/ViewStudents";

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
        path: "/students/edit",
        element: <HomePage />,
        state: "students.edit",
        visibleOn:["Secretary"],
        sidebarProps: {
          displayText: "Edit"
        }
      },
      {
        path: "/students/remove",
        element: <HomePage />,
        state: "students.remove",
        visibleOn:["Secretary","Director"],
        sidebarProps: {
          displayText: "Remove"
        }
      },
    ]
  },
  {
    path: "/stream",
    element: <HomePage />,
    state: "stream",
    visibleOn:["Director"],
    sidebarProps: {
      displayText: "Stream",
      icon: <SchoolOutlinedIcon />
    },
    child: [
      {
        path: "/stream/view",
        element: <HomePage />,
        state: "stream.view",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "View"
        },
      },
      {
        path: "/stream/add",
        element: <HomePage />,
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
        sidebarProps: {
          displayText: "Edit"
        }
      },
      {
        path: "/stream/remove",
        element: <HomePage />,
        state: "stream.remove",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "Remove"
        }
      },
      {
        path: "/stream/add-subject",
        element: <HomePage />,
        state: "stream.remove",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "Add Subject"
        }
      },
    ]
  },
  {
    path: "/grades",
    element: <HomePage />,
    state: "grades",
    visibleOn:["Secretary","Director"],
    sidebarProps: {
      displayText: "Grades",
      icon: <EqualizerOutlinedIcon />
    },
    child: [
      {
        path: "/grades/view",
        element: <HomePage />,
        state: "grades.view",
        visibleOn:["Secretary","Director"],
        sidebarProps: {
          displayText: "View"
        },
      },
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
        path: "/grades/edit",
        element: <HomePage />,
        state: "grades.edit",
        visibleOn:["Secretary"],
        sidebarProps: {
          displayText: "Edit"
        }
      },
      {
        path: "/grades/remove",
        element: <HomePage />,
        state: "grades.remove",
        visibleOn:["Secretary"],
        sidebarProps: {
          displayText: "Remove"
        }
      },
    ]
  },
  {
    path: "/subjects",
    element: <HomePage />,
    state: "subjects",
    visibleOn:["Director"],
    sidebarProps: {
      displayText: "Subjects",
      icon: <SubjectOutlinedIcon />
    },
    child: [
      {
        path: "/subjects/view",
        element: <HomePage />,
        state: "subjects.view",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "View"
        },
      },
      {
        path: "/subjects/add",
        element: <HomePage />,
        state: "subjects.add",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "Add"
        }
      },
      {
        path: "/subjects/edit",
        element: <HomePage />,
        state: "subjects.edit",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "Edit"
        }
      },
      {
        path: "/subjects/remove",
        element: <HomePage />,
        state: "subjects.remove",
        visibleOn:["Director"],
        sidebarProps: {
          displayText: "Remove"
        }
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
