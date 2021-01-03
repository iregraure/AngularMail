package com.angularMail.model.entities;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the mensaje database table.
 * 
 */
@Entity
@Table(name = "mensaje")
@NamedQuery(name="Mensaje.findAll", query="SELECT m FROM Mensaje m")
public class Mensaje implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	@Column(name="asunto")
	private String asunto;

	@Lob
	@Column(name="cuerpo")
	private String cuerpo;

	@Column(name="fecha")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fecha;

	//bi-directional many-to-one association to DestinatarioMensaje
	@OneToMany(mappedBy="mensaje")
	@JsonIgnore
	private List<DestinatarioMensaje> destinatarioMensaje;

	//bi-directional many-to-one association to Usuario
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idEmisor")
	@JsonIgnore
	private Usuario usuarioEmisor;

	public Mensaje() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAsunto() {
		return this.asunto;
	}

	public void setAsunto(String asunto) {
		this.asunto = asunto;
	}

	public String getCuerpo() {
		return this.cuerpo;
	}

	public void setCuerpo(String cuerpo) {
		this.cuerpo = cuerpo;
	}

	public Date getFecha() {
		return this.fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public List<DestinatarioMensaje> getDestinatarioMensaje() {
		return this.destinatarioMensaje;
	}

	public void setDestinatarioMensaje(List<DestinatarioMensaje> destinatarioMensajes) {
		this.destinatarioMensaje = destinatarioMensajes;
	}

	public DestinatarioMensaje addDestinatarioMensaje(DestinatarioMensaje destinatarioMensaje) {
		getDestinatarioMensaje().add(destinatarioMensaje);
		destinatarioMensaje.setMensaje(this);

		return destinatarioMensaje;
	}

	public DestinatarioMensaje removeDestinatarioMensaje(DestinatarioMensaje destinatarioMensaje) {
		getDestinatarioMensaje().remove(destinatarioMensaje);
		destinatarioMensaje.setMensaje(null);

		return destinatarioMensaje;
	}

	public Usuario getUsuarioEmisor() {
		return this.usuarioEmisor;
	}

	public void setUsuarioEmisor(Usuario usuarioEmisor) {
		this.usuarioEmisor = usuarioEmisor;
	}

}