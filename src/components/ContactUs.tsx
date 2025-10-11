import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      detail: "contact@jrprodigy.com",
      link: "mailto:contact@jrprodigy.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone",
      detail: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Address",
      detail: "123 Innovation Drive, Tech Valley, CA 94025",
      link: null,
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Business Hours",
      detail: "Mon - Fri: 9:00 AM - 6:00 PM PST",
      link: null,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1>Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about our smart water meters? We're here to help.
          Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <h2 className="mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="How can we help?"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
            <h3 className="mb-6">Get in Touch</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-background rounded-lg">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-1">{info.title}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.detail}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {info.detail}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Quick Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              For urgent technical support, please call our 24/7 hotline:
            </p>
            <Button variant="outline" className="w-full">
              <Phone className="w-4 h-4 mr-2" />
              Emergency Support
            </Button>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <section>
        <Card className="p-8">
          <h2 className="mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4>How do I install a smart water meter?</h4>
              <p className="text-sm text-muted-foreground">
                Our professional installation team handles everything. Contact
                us to schedule an appointment.
              </p>
            </div>
            <div className="space-y-2">
              <h4>What's the warranty period?</h4>
              <p className="text-sm text-muted-foreground">
                All JR Prodigy meters come with a 5-year warranty covering
                parts and labor.
              </p>
            </div>
            <div className="space-y-2">
              <h4>Can I monitor multiple locations?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! Our dashboard supports unlimited meters across multiple
                locations.
              </p>
            </div>
            <div className="space-y-2">
              <h4>Do you offer custom solutions?</h4>
              <p className="text-sm text-muted-foreground">
                Absolutely. We provide tailored solutions for enterprises and
                special requirements.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
