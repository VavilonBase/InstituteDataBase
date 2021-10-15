import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navibar from "./Components/Navigation/Navibar";
import ListDocuments from "./Components/Documents/ListDocuments";
import AddDocuments from "./Components/Documents/AddDocument";
import EditDocuments from "./Components/Documents/EditDocument";
import ListCountries from "./Components/Countries/ListCountries";
import AddCountry from "./Components/Countries/AddCountry";
import EditCountry from "./Components/Countries/EditCountry";
import ListDisciplines from "./Components/Disciplines/ListDisciplines";
import AddDiscipline from "./Components/Disciplines/AddDiscipline";
import EditDiscipline from "./Components/Disciplines/EditDiscipline";
import ListMarks from "./Components/Marks/ListMarks";
import AddMark from "./Components/Marks/AddMark";
import EditMark from "./Components/Marks/EditMark";
import ListDirections from "./Components/Directions/ListDirections";
import ListGroups from "./Components/Groups/ListGroups";
import ListStudents from "./Components/Students/ListStudents";
import AddDirection from "./Components/Directions/AddDirection";
import AddGroup from "./Components/Groups/AddGroup";
import AddStudent from "./Components/Students/AddStudent";
import EditDirection from "./Components/Directions/EditDirection";
import EditGroup from "./Components/Groups/EditGroup";
import EditStudent from "./Components/Students/EditStudent";

function App() {
  return (
    <div className="App">
        <Router>
            <Navibar/>
            <Switch>
                {/*---------------DOCUMENTS---------------*/}
                <Route path="/documents/" exact component={ListDocuments}/>
                <Route
                    path="/documents/add"
                    exact
                    component={AddDocuments}
                />
                <Route
                    path="/documents/edit/:id"
                    exact
                    component={EditDocuments}
                />
                {/*---------------COUNTRIES---------------*/}
                <Route path="/countries/" exact component={ListCountries}/>
                <Route
                    path="/countries/add"
                    exact
                    component={AddCountry}
                />
                <Route
                    path="/countries/edit/:id"
                    exact
                    component={EditCountry}
                />
                {/*---------------MARKS---------------*/}
                <Route path="/marks/" exact component={ListMarks}/>
                <Route
                    path="/marks/add"
                    exact
                    component={AddMark}
                />
                <Route
                    path="/marks/edit/:id"
                    exact
                    component={EditMark}
                />
                {/*---------------DISCIPLINES---------------*/}
                <Route path="/disciplines/" exact component={ListDisciplines}/>
                <Route
                    path="/disciplines/add"
                    exact
                    component={AddDiscipline}
                />
                <Route
                    path="/disciplines/edit/:id"
                    exact
                    component={EditDiscipline}
                />
                {/*---------------DIRECTIONS---------------*/}
                <Route path="/directions/" exact component={ListDirections}/>
                <Route
                    path="/directions/add"
                    exact
                    component={AddDirection}
                />
                <Route
                    path="/directions/edit/:id"
                    exact
                    component={EditDirection}
                />
                {/*---------------GROUPS---------------*/}
                <Route path="/groups/" exact component={ListGroups}/>
                <Route
                    path="/groups/add"
                    exact
                    component={AddGroup}
                />
                <Route
                    path="/groups/edit/:id"
                    exact
                    component={EditGroup}
                />
                {/*---------------STUDENTS---------------*/}
                <Route path="/students/" exact component={ListStudents}/>
                <Route
                    path="/students/add"
                    exact
                    component={AddStudent}
                />
                <Route
                    path="/students/edit/:id"
                    exact
                    component={EditStudent}
                />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
