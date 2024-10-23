# File: /backend/devops/terraform/security.tf

# Define IAM Role for backend services
resource "aws_iam_role" "backend_role" {
  name = "backend-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

# Define an IAM Policy for accessing backend services (e.g., S3)
resource "aws_iam_policy" "backend_policy" {
  name        = "backend-policy"
  description = "Policy for accessing backend services"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = ["s3:ListBucket"],
        Effect   = "Allow",
        Resource = "arn:aws:s3:::my-backend-bucket"
      }
    ]
  })
}

# Attach the backend policy to the backend role
resource "aws_iam_role_policy_attachment" "backend_role_policy_attach" {
  role       = aws_iam_role.backend_role.name
  policy_arn = aws_iam_policy.backend_policy.arn
}

# Define a security group for web servers
resource "aws_security_group" "web_sg" {
  name        = "web-sg"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main_vpc.id

  # Allow inbound traffic on port 80 (HTTP)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Open to all IPs (adjust for production)
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"  # Allow all protocols
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "web-sg"
  }
}

# Define IAM Policy for full admin access
resource "aws_iam_policy" "admin_policy" {
  name        = "admin-policy"
  description = "Full access to all resources"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = "*",
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

# Attach the admin policy to a specific IAM user
resource "aws_iam_user_policy_attachment" "admin_policy_attach" {
  user       = aws_iam_user.admin_user.name
  policy_arn = aws_iam_policy.admin_policy.arn
}
 
