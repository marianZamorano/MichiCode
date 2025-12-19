output "public_ip" {
  description = "IP publica de la instancia para el despliegue manual"
  value       = aws_instance.app_server.public_ip
}