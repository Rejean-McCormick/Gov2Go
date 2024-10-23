# File: /backend/devops/terraform/main.tf

# Provider configuration for AWS
provider "aws" {
  region = "us-west-2"  # Replace with the desired AWS region
}

# Compute resource: Backend server instance
resource "aws_instance" "backend_server" {
  ami           = "ami-12345678"  # Replace with a valid AMI ID
  instance_type = "t2.micro"      # Choose instance type based on your needs

  tags = {
    Name = "Backend Server"
  }
}

# Networking resource: Security group for the backend server
resource "aws_security_group" "backend_sg" {
  name = "backend-security-group"

  ingress {
    from_port   = 80
    to_port     = 80
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

# Networking resource: Load balancer for the backend server
resource "aws_lb" "backend_lb" {
  name               = "backend-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.backend_sg.id]

  listener {
    port     = 80
    protocol = "HTTP"
    default_action {
      type = "forward"
      target_group_arn = aws_lb_target_group.backend_tg.arn
    }
  }
}

# Load balancer target group for the backend server
resource "aws_lb_target_group" "backend_tg" {
  name     = "backend-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id  # Replace with your VPC ID
}

# Output the public IP of the backend server and the DNS of the load balancer
output "backend_instance_ip" {
  value = aws_instance.backend_server.public_ip
}

output "load_balancer_dns" {
  value = aws_lb.backend_lb.dns_name
}
 
