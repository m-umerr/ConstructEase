package com.edifice.api.repository;

import com.edifice.api.model.Issue;
import com.edifice.api.model.IssueStatus;
import com.edifice.api.model.Project;
import com.edifice.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByProject(Project project);

    List<Issue> findByReportedBy(User user);

    List<Issue> findByAssignedTo(User user);

    List<Issue> findByStatus(IssueStatus status);

    List<Issue> findByProjectAndStatus(Project project, IssueStatus status);

    List<Issue> findByAssignedToAndStatus(User user, IssueStatus status);
}
