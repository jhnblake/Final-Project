import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    tools: "",
    description: "",
    link: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
      alert("Could not load projects. Make sure backend is running.");
    }
  };

  const addProject = async () => {
    if (!form.title || !form.image || !form.description) {
      alert("Please fill title, image, and description");
      return;
    }

    await axios.post("http://localhost:5050/api/projects", form);

    setForm({
      title: "",
      image: "",
      category: "",
      tools: "",
      description: "",
      link: "",
    });

    fetchProjects();
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:5050/api/projects/${id}`);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="app">
      <section className="hero">
        <p className="tag">Creator Portfolio CMS</p>
        <h1>Manage your creative projects visually.</h1>
        <p className="subtitle">
          Add your UI/UX, branding, web design, and creative projects in one
          simple portfolio dashboard.
        </p>
      </section>

      <section className="form-section">
        <h2>Add New Project</h2>

        <div className="form-grid">
          <input
            placeholder="Project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <input
            placeholder="Category e.g. UI/UX Design"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            placeholder="Tools e.g. Figma, React, Branding"
            value={form.tools}
            onChange={(e) => setForm({ ...form, tools: e.target.value })}
          />

          <input
            placeholder="Live project link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />

          <textarea
            placeholder="Project description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button onClick={addProject}>Add Project</button>
        </div>
      </section>

      <section className="projects">
        <div className="section-header">
          <h2>Portfolio Projects</h2>
          <p>{projects.length} project(s) added</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <img src={project.image} alt={project.title} />

              <div className="project-content">
                <span>{project.category || "Creative Project"}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>{project.tools}</small>

                <div className="actions">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      View Project
                    </a>
                  )}

                  <button onClick={() => deleteProject(project._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;