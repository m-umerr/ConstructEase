package com.edifice.api.service;

import com.edifice.api.model.Task;
import com.edifice.api.model.TaskStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<Task> findAllTasks();

    Optional<Task> findTaskById(Long id);

    Task saveTask(Task task);

    void deleteTaskById(Long id);

    List<Task> findTasksByProjectId(Long projectId);

    List<Task> findTasksByAssignedUserId(Long userId);

    List<Task> findTasksByStatus(TaskStatus status);

    List<Task> findTasksDueBeforeDate(LocalDate date);

    List<Task> findTasksByProjectIdAndStatus(Long projectId, TaskStatus status);

    List<Task> findTasksByAssignedUserIdAndStatus(Long userId, TaskStatus status);
}
