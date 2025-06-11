package com.edifice.api.service;

import com.edifice.api.model.Project;
import com.edifice.api.model.ProjectStatus;
import com.edifice.api.model.User;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    List<Project> findAllProjects();

    Optional<Project> findProjectById(Long id);

    Project saveProject(Project project);

    void deleteProjectById(Long id);

    List<Project> findProjectsByStatus(ProjectStatus status);

    List<Project> findProjectsByProjectManager(User projectManager);

    List<Project> findProjectsByTeamMember(User teamMember);
}
