import Breadcrumb from "../components/common/Breadcrumb.jsx";

export default function NotFoundPage() {
  return (
    <main className="page-main shell">
      <Breadcrumb items={[]} />
      <div className="empty-state">
        <h3>Page not found</h3>
        <p>The page you’re looking for doesn’t exist.</p>
      </div>
    </main>
  );
}