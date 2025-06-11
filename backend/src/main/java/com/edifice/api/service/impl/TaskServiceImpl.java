package com.edifice.api.service.impl;

import com.edifice.api.model.Project;
import com.edifice.api.model.Task;
import com.edifice.api.model.TaskStatus;
import com.edifice.api.model.User;
import com.edifice.api.repository.ProjectRepository;
import com.edifice.api.repository.TaskRepository;
import com.edifice.api.repository.UserRepository;
import com.edifice.api.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Task> findAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTaskById(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<Task> findTasksByProjectId(Long projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        return project.map(p -> taskRepository.findByProject(p)).orElse(Collections.emptyList());
    }

    @Override
    public List<Task> findTasksByAssignedUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(u -> taskRepository.findByAssignedTo(u)).orElse(Collections.emptyList());
    }

    @Override
    public List<Task> findTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    @Override
    public List<Task> findTasksDueBeforeDate(LocalDate date) {
        return taskRepository.findByDueDateBefore(date);
    }

    @Override
    public List<Task> findTasksByProjectIdAndStatus(Long projectId, TaskStatus status) {
        Optional<Project> project = projectRepository.findById(projectId);
        return project.map(p -> taskRepository.findByProjectAndStatus(p, status))
                .orElse(Collections.emptyList());
    }

    @Override
    public List<Task> findTasksByAssignedUserIdAndStatus(Long userId, TaskStatus status) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(u -> taskRepository.findByAssignedToAndStatus(u, status))
                .orElse(Collections.emptyList());
    }
}
