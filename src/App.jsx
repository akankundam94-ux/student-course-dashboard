
import { useState } from "react";
import { courses } from "./data/courses";
import "./styles.css";

function CourseCard({ course }) {
  return (
    <article className="course-card">
      <h3>{course.title}</h3>

      <p>
        <strong>Lecturer:</strong> {course.lecturer}
      </p>

      <p>
        <strong>Progress:</strong> {course.progress}%
      </p>

      <progress
        value={course.progress}
        max="100"
        aria-label={`${course.title} progress`}
      />

      <span className={`status ${
        course.completed ? "completed" : "in-progress"
      }`}>
        {course.completed ? "Completed" : "In Progress"}
      </span>
    </article>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const completedCount = courses.filter(
    (course) => course.completed
  ).length;

  const inProgressCount = courses.filter(
    (course) => !course.completed
  ).length;

  const summaryCards = [
    {
      id: "all",
      title: "Total Courses",
      count: courses.length,
      color: "total-card",
    },
    {
      id: "completed",
      title: "Completed Courses",
      count: completedCount,
      color: "completed-card",
    },
    {
      id: "progress",
      title: "Courses in Progress",
      count: inProgressCount,
      color: "progress-card",
    },
  ];

  
const visibleCourses = courses.filter((course) => {
  const matchesFilter =
    filter === "all" ||
    (filter === "completed" && course.completed) ||
    (filter === "progress" && !course.completed);

  const matchesSearch =
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.lecturer.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesFilter && matchesSearch;
});


  const headings = {
    all: "All My Courses",
    completed: "Completed Courses",
    progress: "Courses in Progress",
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Student Course Dashboard</h1>
        <p>Track your courses and learning progress.</p>
      </header>

      <section className="summary-grid">
        {summaryCards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`summary-card ${card.color} ${
              filter === card.id ? "active" : ""
            }`}
            onClick={() => setFilter(card.id)}
            aria-pressed={filter === card.id}
          >
            <h2>{card.title}</h2>
            <p className="summary-number">{card.count}</p>
            <span>
              {filter === card.id ? "Selected" : "Click to view"}
            </span>
          </button>
        ))}
      </section>
<div className="search-box">
  <input
    type="text"
    placeholder="Search courses..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
      <section className="courses-section">
        
        <h2 className="section-title">{headings[filter]}</h2>

        {visibleCourses.length > 0 ? (
          <div className="course-list">
            {visibleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No courses in this category.</p>
        )}
      </section>

      <footer className="dashboard-footer">
        Student Course Dashboard | Built with React
      </footer>
    </main>
  );
}
