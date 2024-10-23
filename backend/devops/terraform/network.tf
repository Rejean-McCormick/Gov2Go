# File: /backend/devops/terraform/network.tf

# Define the Virtual Private Cloud (VPC)
resource "aws_vpc" "main_vpc" {
  cidr_block = "10.0.0.0/16"  # Define the VPC CIDR block
  tags = {
    Name = "main-vpc"
  }
}

# Define the public subnet within the VPC
resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.main_vpc.id  # Attach the subnet to the VPC
  cidr_block        = "10.0.1.0/24"        # Subnet CIDR block
  availability_zone = "us-west-2a"         # Availability zone
  tags = {
    Name = "public-subnet"
  }
}

# Define the private subnet within the VPC
resource "aws_subnet" "private_subnet" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-west-2b"
  tags = {
    Name = "private-subnet"
  }
}

# Create an Internet Gateway for public subnet access
resource "aws_internet_gateway" "main_gateway" {
  vpc_id = aws_vpc.main_vpc.id  # Attach the gateway to the VPC
  tags = {
    Name = "main-gateway"
  }
}

# Define a route table for the public subnet to enable internet access
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main_vpc.id
  route {
    cidr_block = "0.0.0.0/0"  # Route all traffic to the internet
    gateway_id = aws_internet_gateway.main_gateway.id
  }
  tags = {
    Name = "public-route-table"
  }
}

# Associate the public subnet with the public route table
resource "aws_route_table_association" "public_route_assoc" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_route_table.id
}

# Define the security group to control inbound and outbound traffic
resource "aws_security_group" "main_sg" {
  vpc_id = aws_vpc.main_vpc.id

  # Allow inbound SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Open to all IPs (adjust for production)
  }

  # Allow outbound traffic to all destinations
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"  # All protocols
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "main-sg"
  }
}
 
