// import React from "react";
import { Package, DollarSign, Users, TrendingUp } from "lucide-react";
import styled from "styled-components";

// Styled Components
const StatsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .icon-container {
    padding: 0.5rem;
    background-color: #d1fae5;
    border-radius: 0.5rem;
  }

  .change {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${(props) => (props.changeType === "increase" ? "#16a34a" : "#dc2626")};
  }
`;

const StatValue = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const StatTitle = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

export default function AdminStats() {
  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: Package,
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Total Sales",
      value: "₦4,290",
      icon: DollarSign,
      change: "+23%",
      changeType: "increase",
    },
    {
      title: "Total Customers",
      value: "156",
      icon: Users,
      change: "+18%",
      changeType: "increase",
    },
    {
      title: "Growth Rate",
      value: "32%",
      icon: TrendingUp,
      change: "+7%",
      changeType: "increase",
    },
  ];

  return (
    <StatsGrid>
      {stats.map((stat, index) => (
        <StatCard key={index}>
          <StatHeader changeType={stat.changeType}>
            <div className="icon-container">
              <stat.icon size={24} color="#16a34a" />
            </div>
            <span className="change">{stat.change}</span>
          </StatHeader>
          <StatValue>{stat.value}</StatValue>
          <StatTitle>{stat.title}</StatTitle>
        </StatCard>
      ))}
    </StatsGrid>
  );
}
