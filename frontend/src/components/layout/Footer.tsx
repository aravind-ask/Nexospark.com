import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center justify-start gap-2">
              <img
                src="/nexospark-purple-logo.png"
                alt="Nexospark Logo"
                className="h-20 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-primary font-sifonn">NEXOSPARK</h1>
                <p className="text-sm text-gray-200">
                  Passion Unleashed,
                  <br />
                  Potential Realised!
                </p>
              </div>
            </div>
            <p className="text-gray-400 mt-5 ml-1">
              Empowering the future through innovative technology solutions and
              education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-primary"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-primary"
                >
                  Services
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-primary"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary">
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-400 hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {/* <a
                href="#"
                title="facebook"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                title="twitter"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
              >
                <Twitter className="w-6 h-6" />
              </a> */}
              <a
                href="https://www.instagram.com/nexo.spark?igsh=N2o1cTRlbHJmY3J4"
                title="instagram"
                rel="noopener"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/nexospark/"
                title="linkedin"
                rel="noopener"
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Nexospark Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
