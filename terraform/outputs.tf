output "public_ip" {
  description = "Public IP de la instancia EC2 (MichiCode)"
  value       = aws_instance.michicode_server.public_ip
}

output "public_dns" {
  description = "Public DNS de la instancia EC2"
  value       = aws_instance.michicode_server.public_dns
}