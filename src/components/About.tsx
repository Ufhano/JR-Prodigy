import { Card } from "./ui/card";
import { Droplets, Target, Users, Zap } from "lucide-react";

export function About() {
  const features = [
    {
      icon: <Droplets className="w-8 h-8 text-primary" />,
      title: "Smart Monitoring",
      description:
        "Real-time water consumption tracking with advanced IoT sensors and intelligent data analytics.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Instant Alerts",
      description:
        "Receive immediate notifications about leaks, unusual consumption patterns, and system anomalies.",
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Precision Accuracy",
      description:
        "Industry-leading measurement accuracy ensuring you only pay for the water you actually use.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Easy Management",
      description:
        "User-friendly dashboard for effortless monitoring and management of all your water meters.",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1>About JR Prodigy</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Leading the future of water management with innovative smart meter
          technology that helps businesses and communities conserve water and
          reduce costs.
        </p>
      </section>

      {/* Mission Section */}
      <section>
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2>Our Mission</h2>
            <p className="text-muted-foreground">
              At JR Prodigy, we're committed to revolutionizing water
              management through cutting-edge smart meter technology. Our
              mission is to empower organizations with real-time insights that
              drive conservation, reduce waste, and promote sustainable water
              usage for a better tomorrow.
            </p>
          </div>
        </Card>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2>Why Choose JR Prodigy?</h2>
          <p className="text-muted-foreground mt-2">
            Advanced features designed for modern water management
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3>{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h2 className="text-primary">10,000+</h2>
              <p className="text-muted-foreground">Meters Installed</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-primary">98%</h2>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-primary">24/7</h2>
              <p className="text-muted-foreground">Monitoring & Support</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Company Info */}
      <section className="space-y-6">
        <h2 className="text-center">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="mb-4">Innovation</h3>
            <p className="text-muted-foreground">
              Founded in 2018, JR Prodigy emerged from a simple idea: water is
              precious, and every drop counts. Our team of engineers and
              environmental experts developed smart metering solutions that
              combine IoT technology with advanced analytics.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="mb-4">Sustainability</h3>
            <p className="text-muted-foreground">
              We believe in creating a sustainable future through technology.
              Our smart meters help reduce water waste by up to 30%, saving
              both resources and costs while contributing to environmental
              conservation efforts worldwide.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
