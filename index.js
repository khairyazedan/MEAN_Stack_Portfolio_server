require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const aboutRoutes = require("./routes/about.routes.js");
const articleRoutes = require('./routes/article.routes.js');
const contactRoutes = require('./routes/contact.routes.js');
const projectsRoutes = require('./routes/projects.routes.js');
const settingRoutes = require('./routes/settings.routes.js');
const skillsRoutes = require('./routes/skills.routes.js');
const testimonialsRoutes = require('./routes/testimonials.routes.js');
const userRoutes = require('./routes/user.routes.js');

const connectToDatabase = require('./config/db.config');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.use("/user", userRoutes);
app.use("/about", aboutRoutes);
app.use("/article", articleRoutes);
app.use("/contact", contactRoutes);
app.use("/project", projectsRoutes);
app.use("/setting", settingRoutes);
app.use('/skill', skillsRoutes);
app.use('/testimonials', testimonialsRoutes);

connectToDatabase()

app.listen(port,_=>console.log(`Server is up and running on port ${port}`));
