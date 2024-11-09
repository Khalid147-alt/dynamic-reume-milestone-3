"use client"
import { useState, FormEvent } from 'react';
import styles from './styles/Home.module.css';

interface Education {
  school: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
}

export default function Home() {
  const [formData, setFormData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: [''],
  });

  const [showResume, setShowResume] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowResume(true);
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', year: '' }],
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', position: '', duration: '', description: '' }],
    });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ''],
    });
  };

  return (
    <div className={styles.container}>
      {!showResume ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Resume Builder</h1>
          
          <section className={styles.section}>
            <h2>Personal Information</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </section>

          <section className={styles.section}>
            <h2>Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className={styles.fieldGroup}>
                <input
                  type="text"
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].school = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].degree = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].year = e.target.value;
                    setFormData({ ...formData, education: newEducation });
                  }}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addEducation} className={styles.addButton}>
              Add Education
            </button>
          </section>

          <section className={styles.section}>
            <h2>Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className={styles.fieldGroup}>
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...formData.experience];
                    newExperience[index].company = e.target.value;
                    setFormData({ ...formData, experience: newExperience });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => {
                    const newExperience = [...formData.experience];
                    newExperience[index].position = e.target.value;
                    setFormData({ ...formData, experience: newExperience });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => {
                    const newExperience = [...formData.experience];
                    newExperience[index].duration = e.target.value;
                    setFormData({ ...formData, experience: newExperience });
                  }}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExperience = [...formData.experience];
                    newExperience[index].description = e.target.value;
                    setFormData({ ...formData, experience: newExperience });
                  }}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addExperience} className={styles.addButton}>
              Add Experience
            </button>
          </section>

          <section className={styles.section}>
            <h2>Skills</h2>
            {formData.skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...formData.skills];
                  newSkills[index] = e.target.value;
                  setFormData({ ...formData, skills: newSkills });
                }}
                required
              />
            ))}
            <button type="button" onClick={addSkill} className={styles.addButton}>
              Add Skill
            </button>
          </section>

          <button type="submit" className={styles.submitButton}>
            Generate Resume
          </button>
        </form>
      ) : (
        <div className={styles.resume}>
          <button onClick={() => setShowResume(false)} className={styles.backButton}>
            Back to Form
          </button>
          
          <h1>{formData.name}</h1>
          <p>{formData.email} | {formData.phone}</p>

          <section>
            <h2>Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index}>
                <h3>{edu.school}</h3>
                <p>{edu.degree} - {edu.year}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <h3>{exp.company}</h3>
                <p>{exp.position} | {exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Skills</h2>
            <div className={styles.skillsList}>
              {formData.skills.map((skill, index) => (
                <span key={index} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}