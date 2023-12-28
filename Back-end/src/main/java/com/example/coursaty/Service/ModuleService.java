package com.example.coursaty.Service;

import com.example.coursaty.Entitiy.Lesson;
import com.example.coursaty.Entitiy.Module;
import com.example.coursaty.Entitiy.Response.CustomResponseCode;
import com.example.coursaty.Entitiy.Response.CustomResponseEntity;
import com.example.coursaty.Repository.ModuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModuleService {

    private ModuleRepository moduleRepository;

    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    public CustomResponseEntity<?> getModule(long id) {
        Optional<Module> module = moduleRepository.findById(id);
        if (module.isPresent()) {
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, module.get());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<?> getModuleLessons(long id) {
        Optional<Module> module = moduleRepository.findById(id);
        if (module.isPresent()) {
            return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, module.get().getLessons());
        }
        return new CustomResponseEntity<>(CustomResponseCode.FAIL);
    }

    public CustomResponseEntity<?> addModule(Module module) {
        System.out.println(module.getCourse().getId());
        return new CustomResponseEntity<>(CustomResponseCode.SUCCESS, moduleRepository.save(module));
    }

}
