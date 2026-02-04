import { Shield, CheckCircle, Zap } from "lucide-react";

export function TrustBadges() {
  const badges = [
    { icon: Shield, label: "Secure Application" },
    { icon: CheckCircle, label: "No CRB Check" },
    { icon: Zap, label: "Instant Approval" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 py-4">
      {badges.map((badge) => (
        <div key={badge.label} className="trust-badge">
          <badge.icon className="w-4 h-4 text-primary" />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
