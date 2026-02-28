import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";

actor {
  // Types
  type Job = {
    id : Nat;
    title : Text;
    location : Text;
    jobType : Text;
    description : Text;
    skills : [Text];
    posted : Int;
  };

  module Job {
    public func compareByPosted(job1 : Job, job2 : Job) : Order.Order {
      Int.compare(job2.posted, job1.posted);
    };
  };

  type Application = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    skills : [Text];
    coverMessage : Text;
    applied : Int;
  };

  module Application {
    public func compareByApplied(application1 : Application, application2 : Application) : Order.Order {
      Int.compare(application2.applied, application1.applied);
    };
  };

  type Inquiry = {
    id : Nat;
    companyName : Text;
    contactName : Text;
    email : Text;
    roleNeeded : Text;
    details : Text;
    submitted : Int;
  };

  module Inquiry {
    public func compareBySubmitted(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Int.compare(inquiry2.submitted, inquiry1.submitted);
    };
  };

  type Testimonial = {
    id : Nat;
    author : Text;
    company : Text;
    quote : Text;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submitted : Int;
  };

  module ContactMessage {
    public func compareBySubmitted(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      Int.compare(message2.submitted, message1.submitted);
    };
  };

  // Persistent Storage
  var jobId = 0;
  var applicationId = 0;
  var inquiryId = 0;
  var testimonialId = 0;
  var contactMessageId = 0;

  let jobsMap = Map.empty<Nat, Job>();
  let applicationsMap = Map.empty<Nat, Application>();
  let inquiriesMap = Map.empty<Nat, Inquiry>();
  let testimonialsMap = Map.empty<Nat, Testimonial>();
  let contactMessagesMap = Map.empty<Nat, ContactMessage>();

  // Add Job
  public shared ({ caller }) func addJob(title : Text, location : Text, jobType : Text, description : Text, skills : [Text]) : async Nat {
    let id = jobId;
    jobId += 1;

    let job : Job = {
      id;
      title;
      location;
      jobType;
      description;
      skills;
      posted = Time.now();
    };

    jobsMap.add(id, job);
    id;
  };

  // Get all Jobs
  public query ({ caller }) func getAllJobs() : async [Job] {
    jobsMap.values().toArray().sort(Job.compareByPosted);
  };

  // Submit Application
  public shared ({ caller }) func submitApplication(name : Text, email : Text, phone : Text, skills : [Text], coverMessage : Text) : async Nat {
    let id = applicationId;
    applicationId += 1;

    let application : Application = {
      id;
      name;
      email;
      phone;
      skills;
      coverMessage;
      applied = Time.now();
    };

    applicationsMap.add(id, application);
    id;
  };

  // Submit Inquiry
  public shared ({ caller }) func submitInquiry(companyName : Text, contactName : Text, email : Text, roleNeeded : Text, details : Text) : async Nat {
    let id = inquiryId;
    inquiryId += 1;

    let inquiry : Inquiry = {
      id;
      companyName;
      contactName;
      email;
      roleNeeded;
      details;
      submitted = Time.now();
    };

    inquiriesMap.add(id, inquiry);
    id;
  };

  // Add Testimonial
  public shared ({ caller }) func addTestimonial(author : Text, company : Text, quote : Text) : async Nat {
    let id = testimonialId;
    testimonialId += 1;

    let testimonial : Testimonial = {
      id;
      author;
      company;
      quote;
    };

    testimonialsMap.add(id, testimonial);
    id;
  };

  // Get all Testimonials
  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonialsMap.values().toArray();
  };

  // Submit Contact Message
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async Nat {
    let id = contactMessageId;
    contactMessageId += 1;

    let contactMessage : ContactMessage = {
      id;
      name;
      email;
      message;
      submitted = Time.now();
    };

    contactMessagesMap.add(id, contactMessage);
    id;
  };

  // Initialize Sample Jobs and Testimonials
  public shared ({ caller }) func initializeSampleData() : async () {
    if (jobId == 0) {
      ignore await addJob(
        "Software Engineer",
        "Remote",
        "Full Time",
        "Develop and maintain web applications",
        ["JavaScript", "React", "Node.js"]
      );

      ignore await addJob(
        "IT Project Manager",
        "Berlin",
        "Contract",
        "Manage IT projects and teams",
        ["Project Management", "Agile", "SCRUM"]
      );
    };

    if (testimonialId == 0) {
      ignore await addTestimonial(
        "John Doe",
        "TechCorp",
        "Fantastic service, helped us find great talent!"
      );

      ignore await addTestimonial(
        "Jane Smith",
        "Innovatech",
        "Very professional and reliable recruiting partner."
      );
    };
  };
};
