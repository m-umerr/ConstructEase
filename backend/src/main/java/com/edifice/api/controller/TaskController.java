package com.edifice.api.controller;

import com.edifice.api.model.Task;
import com.edifice.api.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('PROJECT_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.findAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('PROJECT_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") long id) {
        return taskService.findTaskById(id)
                .map(task -> new ResponseEntity<>(task, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/project/{projectId}")
    @PreAuthorize("hasRole('USER') or hasRole('PROJECT_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable("projectId") long projectId) {
        List<Task> tasks = taskService.findTasksByProjectId(projectId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/assigned/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('PROJECT_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<Task>> getTasksAssignedToUser(@PathVariable("userId") long userId) {
        List<Task> tasks = taskService.findTasksByAssignedUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('PROJECT_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        Task newTask = taskService.saveTask(task);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PROJECT_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Task> updateTask(@PathVariable("id") long id, @Valid @RequestBody Task task) {
        return taskService.findTaskById(id)
                .map(existingTask -> {
                    task.setId(id);
                    return new ResponseEntity<>(taskService.saveTask(task), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PROJECT_MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable("id") long id) {
        try {
            taskService.deleteTaskById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
