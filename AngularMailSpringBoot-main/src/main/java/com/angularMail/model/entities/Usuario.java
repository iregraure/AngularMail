package com.angularMail.model.entities;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the usuario database table.
 * 
 */
@Entity
@Table(name = "usuario")
@NamedQuery(name="Usuario.findAll", query="SELECT u FROM Usuario u")
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private int id;

	@Column(name="email")
	private String email;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="fechaEliminacion")
	private Date fechaEliminacion;

	@Temporal(TemporalType.DATE)
	@Column(name="fechaNacimiento")
	private Date fechaNacimiento;

	@Lob
	@Column(name="imagen")
	private byte[] imagen;

	@Column(name="nombre")
	private String nombre;

	@Column(name="password")
	private String password;

	@Column(name="usuario")
	private String usuario;

	//bi-directional many-to-one association to DestinatarioMensaje
	@OneToMany(mappedBy="usuario")
	@JsonIgnore
	private List<DestinatarioMensaje> destinatarioMensajes;

	//bi-directional many-to-one association to Mensaje
	@OneToMany(mappedBy="usuarioEmisor")
	@JsonIgnore
	private List<Mensaje> mensajes;

	//bi-directional many-to-one association to Nacionalidad
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idNacionalidad")
	@JsonIgnore
	private Nacionalidad nacionalidad;

	//bi-directional many-to-one association to TipoSexo
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idTipoSexo")
	@JsonIgnore
	private TipoSexo tipoSexo;

	public Usuario() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getFechaEliminacion() {
		return this.fechaEliminacion;
	}

	public void setFechaEliminacion(Date fechaEliminacion) {
		this.fechaEliminacion = fechaEliminacion;
	}

	public Date getFechaNacimiento() {
		return this.fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public byte[] getImagen() {
		return this.imagen;
	}

	public void setImagen(byte[] imagen) {
		this.imagen = imagen;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsuario() {
		return this.usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public List<DestinatarioMensaje> getDestinatarioMensajes() {
		return this.destinatarioMensajes;
	}

	public void setDestinatarioMensajes(List<DestinatarioMensaje> destinatarioMensajes) {
		this.destinatarioMensajes = destinatarioMensajes;
	}

	public DestinatarioMensaje addDestinatarioMensaje(DestinatarioMensaje destinatarioMensaje) {
		getDestinatarioMensajes().add(destinatarioMensaje);
		destinatarioMensaje.setUsuario(this);

		return destinatarioMensaje;
	}

	public DestinatarioMensaje removeDestinatarioMensaje(DestinatarioMensaje destinatarioMensaje) {
		getDestinatarioMensajes().remove(destinatarioMensaje);
		destinatarioMensaje.setUsuario(null);

		return destinatarioMensaje;
	}

	public List<Mensaje> getMensajes() {
		return this.mensajes;
	}

	public void setMensajes(List<Mensaje> mensajes) {
		this.mensajes = mensajes;
	}

	public Mensaje addMensaje(Mensaje mensaje) {
		getMensajes().add(mensaje);
		mensaje.setUsuarioEmisor(this);

		return mensaje;
	}

	public Mensaje removeMensaje(Mensaje mensaje) {
		getMensajes().remove(mensaje);
		mensaje.setUsuarioEmisor(null);

		return mensaje;
	}

	public Nacionalidad getNacionalidad() {
		return this.nacionalidad;
	}

	public void setNacionalidad(Nacionalidad nacionalidad) {
		this.nacionalidad = nacionalidad;
	}

	public TipoSexo getTipoSexo() {
		return this.tipoSexo;
	}

	public void setTipoSexo(TipoSexo tipoSexo) {
		this.tipoSexo = tipoSexo;
	}

}