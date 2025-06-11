package com.edifice.api.repository;

import com.edifice.api.model.Resource;
import com.edifice.api.model.ResourceStatus;
import com.edifice.api.model.ResourceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByType(ResourceType type);

    List<Resource> findByStatus(ResourceStatus status);

    List<Resource> findByTypeAndStatus(ResourceType type, ResourceStatus status);

    List<Resource> findByQuantityAvailableGreaterThan(Integer quantity);
}
