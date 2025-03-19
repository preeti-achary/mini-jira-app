const express = require('express');
const bodyParser = require('body-parser');
const tasks = require('./tasks');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/projects/:name/tasks', (req, res) => {
    const projectName = req.params.name;
    const projectTasks = tasks.filter(task => task.project === projectName);
    if (projectTasks.length > 0) {
        res.json(projectTasks);
    } else {
        res.status(404).json({ error: 'Project not found or no tasks available for this project.' });
    }
});


app.get('/tasks/sort/by-priority', (req, res) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const sortedTasks = [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    res.json(sortedTasks);
});


app.post('/tasks', (req, res) => {
    const { title, project, assignedTo, priority, status } = req.body;
    if (!title || !project || !assignedTo || !priority || !status) {
        return res.status(400).json({ error: 'All fields are required.' });
    }


    const validPriorities = ['high', 'medium', 'low'];
    const validStatuses = ['open', 'in progress', 'closed'];

    if (!validPriorities.includes(priority)) {
        return res.status(400).json({ error: `Invalid priority. Valid options are: ${validPriorities.join(', ')}.` });
    }

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Valid options are: ${validStatuses.join(', ')}.` });
    }


    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

    const newTask = {
        id: newId,
        title,
        project,
        assignedTo,
        priority,
        status,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/users/:name/tasks', (req, res) => {
    const tasks = req.params.tasks;
    res.status(400).json({ error: "All tasks assigned to a specific person" })
    return tasks;
})

app.get("/tasks/pending", (req, res) => {
    const pending = req.params.pending;
    res.status(400).json({ error: "All tasks that are still open" });
    return pending;
})

app.post("/tasks/:id/status", (req, res) => {
    const id = req.params.id;
    if (!tasks || open || inprogress || closed);
    res.status(400).json({ error: "Update the status " })
    return id;
})

app.get("/tasks/sort/by-priority", (req, res) => {
    const priority = req.params.priority;
    if (!priority || high || medium || low);
    res.status(400).json({ error: "All " })
})

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found.' });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

