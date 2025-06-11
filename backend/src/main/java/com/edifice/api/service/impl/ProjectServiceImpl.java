package com.edifice.api.service.impl;

import com.edifice.api.model.Project;
import com.edifice.api.model.ProjectStatus;
import com.edifice.api.model.User;
import com.edifice.api.repository.ProjectRepository;
import com.edifice.api.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Optional<Project> findProjectById(Long id) {
        return projectRepository.findById(id);
    }

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public void deleteProjectById(Long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public List<Project> findProjectsByStatus(ProjectStatus status) {
        return projectRepository.findByStatus(status);
    }

    @Override
    public List<Project> findProjectsByProjectManager(User projectManager) {
        return projectRepository.findByProjectManager(projectManager);
    }

    @Override
    public List<Project> findProjectsByTeamMember(User teamMember) {
        return projectRepository.findByTeamMembersContaining(teamMember);
    }
}
