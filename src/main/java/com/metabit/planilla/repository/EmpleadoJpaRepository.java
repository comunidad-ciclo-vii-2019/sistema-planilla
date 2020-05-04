package com.metabit.planilla.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.metabit.planilla.entity.Empleado;
import com.metabit.planilla.entity.Genero;

@Repository("empleadoJpaRepository")
public interface EmpleadoJpaRepository extends JpaRepository<Empleado,Serializable>{

	public abstract List<Empleado> findByGenero(Genero genero);
}
