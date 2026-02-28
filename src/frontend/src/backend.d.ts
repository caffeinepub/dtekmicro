import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Job {
    id: bigint;
    title: string;
    jobType: string;
    description: string;
    skills: Array<string>;
    location: string;
    posted: bigint;
}
export interface Testimonial {
    id: bigint;
    quote: string;
    author: string;
    company: string;
}
export interface backendInterface {
    addJob(title: string, location: string, jobType: string, description: string, skills: Array<string>): Promise<bigint>;
    addTestimonial(author: string, company: string, quote: string): Promise<bigint>;
    getAllJobs(): Promise<Array<Job>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    initializeSampleData(): Promise<void>;
    submitApplication(name: string, email: string, phone: string, skills: Array<string>, coverMessage: string): Promise<bigint>;
    submitContactMessage(name: string, email: string, message: string): Promise<bigint>;
    submitInquiry(companyName: string, contactName: string, email: string, roleNeeded: string, details: string): Promise<bigint>;
}
