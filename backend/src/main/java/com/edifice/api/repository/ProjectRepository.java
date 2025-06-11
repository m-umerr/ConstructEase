package com.edifice.api.repository;

import com.edifice.api.model.Project;
import com.edifice.api.model.ProjectStatus;
import com.edifice.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByProjectManager(User projectManager);

    List<Project> findByStatus(ProjectStatus status);

    Optional<Project> findByProjectNumber(String projectNumber);

    List<Project> findByTeamMembersContaining(User user);
}
