provider "aws" {
  region = "us-west-2"
}

resource "aws_security_group" "michicode_sg" {
  name        = "michicode-sg-final"
  description = "Permitir App, Monitoreo y SSH"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "michicode_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.small"
  key_name      = "michicode-key"
  vpc_security_group_ids = [aws_security_group.michicode_sg.id]

  root_block_device {
    volume_size = 20
  }

  tags = {
    Name = "MichiCode-Final-Server"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io docker-compose
              sudo systemctl start docker
              sudo systemctl enable docker

              mkdir -p /opt/prometheus /opt/grafana /opt/loki /opt/promtail

              docker network create michicode-net
              docker run -d --name michicode-mongo --network michicode-net -p 27017:27017 \
              -e MONGO_INITDB_ROOT_USERNAME=mongo \
              -e MONGO_INITDB_ROOT_PASSWORD=mongo mongo:6


              docker run -d --name backend --network michicode-net -p 5000:5000 \
              -e MONGODB_URI="mongodb://mongo:mongo@michicode-mongo:27017/michicode" \
              marianz16/michicode-backend:latest

              docker run -d \
              --name frontend \
              --network michicode-net \
              -p 80:80 \
              marianz16/michicode-frontend:latest

              docker run -d \
              --name grafana \
              --network michicode-net \
              -p 3000:3000 \
              grafana/grafana:latest

              docker run -d \
              --name prometheus \
              --network michicode-net \
              -p 9090:9090 \
              prom/prometheus:latest

              docker run -d \
              --name node-exporter \
              --network michicode-net \
              -p 9100:9100 \
              prom/node-exporter:latest

              docker run -d \
              --name loki \
              --network michicode-net \
              -p 3100:3100 \
              grafana/loki:latest \
              -config.file=/etc/loki/local-config.yaml

              docker run -d \
              --name promtail \
              --network michicode-net \
              -v /var/log:/var/log \
              grafana/promtail:latest \
              -config.file=/etc/promtail/config.yml


              EOF

}