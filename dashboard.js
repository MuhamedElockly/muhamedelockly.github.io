// Project Management
class ProjectManager {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
        this.currentProjectId = null;
        this.initializeEventListeners();
        this.loadProjects();
    }

    initializeEventListeners() {
        // Save project button
        document.getElementById('saveProjectBtn').addEventListener('click', () => this.saveProject());

        // Delete confirmation button
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.deleteProject());

        // Form reset when modal is closed
        document.getElementById('addProjectModal').addEventListener('hidden.bs.modal', () => {
            this.resetForm();
        });
    }

    loadProjects() {
        const tableBody = document.getElementById('projectsTableBody');
        tableBody.innerHTML = '';

        this.projects.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Title">${project.title}</td>
                <td data-label="Type">${project.type}</td>
                <td data-label="Technologies">${project.technologies.join(', ')}</td>
                <td data-label="Status">
                    <span class="status-badge status-completed">Completed</span>
                </td>
                <td data-label="Actions" class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="projectManager.editProject('${project.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="projectManager.confirmDelete('${project.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    saveProject() {
        const form = document.getElementById('projectForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const projectData = {
            id: this.currentProjectId || Date.now().toString(),
            title: document.getElementById('projectTitle').value,
            type: document.getElementById('projectType').value,
            description: document.getElementById('projectDescription').value,
            technologies: document.getElementById('projectTechnologies').value.split(',').map(tech => tech.trim()),
            features: document.getElementById('projectFeatures').value.split('\n').filter(feature => feature.trim()),
            challenges: document.getElementById('projectChallenges').value,
            solutions: document.getElementById('projectSolutions').value,
            date: document.getElementById('projectDate').value,
            duration: document.getElementById('projectDuration').value,
            role: document.getElementById('projectRole').value,
            contributions: document.getElementById('projectContributions').value.split('\n').filter(contribution => contribution.trim()),
            githubUrl: document.getElementById('projectGithubUrl').value,
            videoId: document.getElementById('projectVideoId').value
        };

        if (this.currentProjectId) {
            // Update existing project
            const index = this.projects.findIndex(p => p.id === this.currentProjectId);
            if (index !== -1) {
                this.projects[index] = projectData;
            }
        } else {
            // Add new project
            this.projects.push(projectData);
        }

        localStorage.setItem('projects', JSON.stringify(this.projects));
        this.loadProjects();
        this.resetForm();
        bootstrap.Modal.getInstance(document.getElementById('addProjectModal')).hide();
    }

    editProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.currentProjectId = projectId;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectType').value = project.type;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectTechnologies').value = project.technologies.join(', ');
        document.getElementById('projectFeatures').value = project.features.join('\n');
        document.getElementById('projectChallenges').value = project.challenges;
        document.getElementById('projectSolutions').value = project.solutions;
        document.getElementById('projectDate').value = project.date;
        document.getElementById('projectDuration').value = project.duration;
        document.getElementById('projectRole').value = project.role;
        document.getElementById('projectContributions').value = project.contributions.join('\n');
        document.getElementById('projectGithubUrl').value = project.githubUrl;
        document.getElementById('projectVideoId').value = project.videoId;

        const modal = new bootstrap.Modal(document.getElementById('addProjectModal'));
        modal.show();
    }

    confirmDelete(projectId) {
        this.currentProjectId = projectId;
        const modal = new bootstrap.Modal(document.getElementById('deleteProjectModal'));
        modal.show();
    }

    deleteProject() {
        if (!this.currentProjectId) return;

        this.projects = this.projects.filter(p => p.id !== this.currentProjectId);
        localStorage.setItem('projects', JSON.stringify(this.projects));
        this.loadProjects();
        this.currentProjectId = null;
        bootstrap.Modal.getInstance(document.getElementById('deleteProjectModal')).hide();
    }

    resetForm() {
        document.getElementById('projectForm').reset();
        this.currentProjectId = null;
        document.getElementById('addProjectModalLabel').textContent = 'Add New Project';
    }
}

// Initialize Project Manager
const projectManager = new ProjectManager(); 