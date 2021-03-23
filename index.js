const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PATH_TO_PROJECTS = path.join(__dirname, "projects");
const projects = require("./data/projects.json");
var port = process.env.PORT || 3000;

const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static(PATH_TO_PROJECTS));
app.use(express.static(path.join(__dirname, "public")));

function findProject(directoryName) {
    const thisProject = projects.find((project) => {
        return project.directory === directoryName;
    });
    thisProject.active = true;
    return thisProject;
}

app.get("/", (request, response) => {
    response.render("homepage", {
        helpers: {
            checkIfCurrent(directory, list, options) {
                list.forEach((project) => {
                    if (directory === project.directory) {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                });
            },
        },
        projectList: projects,
    });
});

app.get("/projects/:name", (request, response) => {
    const directoryName = request.params.name;
    const currentProject = findProject(directoryName);
    if (!currentProject) {
        response.sendStatus(404);
        return;
    }
    response.render("details", {
        helpers: {
            checkIfCurrent(directory, list, options) {
                list.forEach((project) => {
                    if (directory === project.directory) {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                });
            },
            checklength(arg1, options) {
                if (arg1 && arg1.length > 0) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
        },
        projectList: projects,
        title: currentProject.title,
        currentDirectory: currentProject.directory,
        URL: currentProject.URL,
        img: currentProject.img,
        body: currentProject.body,
        info: currentProject.info,
    });
});

app.listen(port, null, () => {
    console.log(`Server started on: ${port}`);
});
