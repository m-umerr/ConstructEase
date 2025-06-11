package com.edifice.api.repository;

import com.edifice.api.model.Project;
import com.edifice.api.model.Task;
import com.edifice.api.model.TaskStatus;
import com.edifice.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);

    List<Task> findByAssignedTo(User user);

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByDueDateBefore(LocalDate date);

    List<Task> findByProjectAndStatus(Project project, TaskStatus status);

    List<Task> findByAssignedToAndStatus(User user, TaskStatus status);
}
