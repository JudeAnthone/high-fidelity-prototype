import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const initialAssignments = [
	{
		id: 1,
		title: "HCI Prototype Submission",
		dueDate: "Jan 10",
		status: "Pending",
		course: "Human-Computer Interaction",
		priority: "High",
	},
	{
		id: 2,
		title: "Software Engineering Defense",
		dueDate: "Jan 12",
		status: "Pending",
		course: "Software Engineering",
		priority: "Medium",
	},
	{
		id: 3,
		title: "Research Paper Draft",
		dueDate: "Jan 14",
		status: "Pending",
		course: "Intelligent Systems",
		priority: "Low",
	},
	{
		id: 4,
		title: "Algorithm Problem Set 5",
		dueDate: "Jan 8",
		status: "Done",
		course: "Data Structures",
		priority: "Medium",
	},
	{
		id: 5,
		title: "Software Engineering Report",
		dueDate: "Jan 6",
		status: "Done",
		course: "Software Engineering",
		priority: "Low",
	},
];

const AssList = () => {
	const navigate = useNavigate();
	const [assignments, setAssignments] = useState(initialAssignments);
	const [filter, setFilter] = useState<"all" | "pending" | "done">("all");

	const pendingTasks = assignments.filter((a) => a.status === "Pending");
	const completedTasks = assignments.filter((a) => a.status === "Done");

	const filteredPending = filter === "done" ? [] : pendingTasks;
	const filteredCompleted = filter === "pending" ? [] : completedTasks;

	const getPriorityStyles = (priority: string) => {
		switch (priority) {
			case "High":
				return { dot: "bg-rose-400", text: "text-rose-600 font-semibold" };
			case "Medium":
				return { dot: "bg-amber-400", text: "text-amber-600 font-semibold" };
			default:
				return { dot: "bg-emerald-400", text: "text-emerald-600 font-semibold" };
		}
	};

	const toggleTaskStatus = (id: number) => {
		setAssignments((prev) =>
			prev.map((task) =>
				task.id === id
					? { ...task, status: task.status === "Pending" ? "Done" : "Pending" }
					: task
			)
		);
	};

	return (
		<div className="max-w-md mx-auto px-5 py-6 min-h-screen pb-28">
			{/* Header */}
			<header className="mb-6 animate-fade-in-up">
				<button
					onClick={() => navigate("/")}
					className="text-stone-500 text-base font-bold mb-4 flex items-center gap-1 hover:text-stone-800 transition-colors press-effect"
				>
					← Back
				</button>
				<h1 className="text-2xl font-bold text-stone-800">Assignments</h1>

				{/* Stats Pills */}
				<div className="flex gap-2 mt-4">
					<div className="flex items-center gap-1.5 bg-amber-50 px-3 py-2 rounded-full border border-amber-100">
						<div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
						<span className="text-base font-bold text-amber-700">
							{pendingTasks.length}
						</span>
						<span className="text-base font-medium text-amber-600">pending</span>
					</div>
					<div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-100">
						<div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
						<span className="text-base font-bold text-emerald-700">
							{completedTasks.length}
						</span>
						<span className="text-base font-medium text-emerald-600">done</span>
					</div>
				</div>
			</header>

			{/* Filter Tabs */}
			<div className="flex gap-2 mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
				{[
					{ key: "all", label: "All" },
					{ key: "pending", label: "To Do" },
					{ key: "done", label: "Done" },
				].map(({ key, label }) => (
					<button
						key={key}
						onClick={() => setFilter(key as typeof filter)}
						className={`px-4 py-2.5 rounded-xl text-base font-semibold transition-all duration-200 press-effect ${
							filter === key
								? "bg-indigo-100 text-indigo-700 border-2 border-indigo-200"
								: "bg-stone-100 text-stone-600 border-2 border-transparent hover:bg-stone-200"
						}`}
					>
						{label}
					</button>
				))}
			</div>

			{/* Pending Section */}
			{filteredPending.length > 0 && (
				<section className="mb-8">
					<h2 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3 animate-fade-in">
						To Do
					</h2>
					<div className="space-y-3 stagger-children">
						{filteredPending.map((assignment) => {
							const styles = getPriorityStyles(assignment.priority);
							return (
								<div
									key={assignment.id}
									className="bg-white rounded-xl p-4 border border-stone-100 transition-all duration-200 hover:border-stone-200 hover:shadow-sm animate-fade-in-up"
								>
									<div className="flex items-start gap-3">
										<button
											onClick={() => toggleTaskStatus(assignment.id)}
											className="w-6 h-6 rounded-full border-2 border-stone-300 mt-0.5 shrink-0 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 press-effect"
											aria-label="Mark as complete"
										/>
										<div className="flex-1 min-w-0">
											<div className="flex items-start justify-between gap-2">
												<h3 className="font-semibold text-stone-800 text-base leading-snug">
													{assignment.title}
												</h3>
												<div
													className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${styles.dot}`}
												/>
											</div>
											<p className="text-stone-500 text-sm font-medium mt-1">
												{assignment.course}
											</p>
											<div className="flex items-center justify-between mt-2">
												<div className="flex items-center gap-1">
													<p className="text-stone-500 text-sm font-medium">
														Due {assignment.dueDate}
													</p>
												</div>
												<span className={`text-sm ${styles.text}`}>
													{assignment.priority}
												</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			)}

			{/* Completed Section */}
			{filteredCompleted.length > 0 && (
				<section className="mb-6">
					<h2 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3 animate-fade-in">
						Completed
					</h2>
					<div className="space-y-3 stagger-children">
						{filteredCompleted.map((assignment) => (
							<div
								key={assignment.id}
								className="bg-stone-50/80 rounded-xl p-4 border border-stone-100 transition-all duration-200 animate-fade-in-up"
							>
								<div className="flex items-start gap-3">
									<button
										onClick={() => toggleTaskStatus(assignment.id)}
										className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5 shrink-0 hover:bg-emerald-200 transition-colors press-effect"
										aria-label="Mark as incomplete"
									>
										<span className="text-emerald-600 text-sm font-bold">
											✓
										</span>
									</button>
									<div className="flex-1 min-w-0">
										<h3 className="font-semibold text-stone-400 text-base line-through decoration-stone-300">
											{assignment.title}
										</h3>
										<p className="text-stone-400 text-sm font-medium mt-1">
											{assignment.course}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Empty State */}
			{filteredPending.length === 0 && filteredCompleted.length === 0 && (
				<div className="text-center py-12 animate-fade-in">
					<span className="text-5xl">🎉</span>
					<p className="text-stone-600 font-semibold text-lg mt-3">No tasks here!</p>
				</div>
			)}

			{/* Floating Add Button */}
			<div className="fixed bottom-6 left-0 right-0 max-w-md mx-auto px-5">
				<Button
					variant="contained"
					fullWidth
					onClick={() => navigate("/add-task")}
					sx={{
						backgroundColor: "#6366f1",
						textTransform: "none",
						padding: "16px 20px",
						fontSize: "16px",
						fontWeight: 600,
						borderRadius: "14px",
						boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
						transition: "all 0.2s ease",
						"&:hover": {
							backgroundColor: "#4f46e5",
							boxShadow: "0 6px 24px rgba(99, 102, 241, 0.4)",
							transform: "translateY(-2px)",
						},
						"&:active": {
							transform: "translateY(0)",
						},
					}}
				>
					+ Add New Task
				</Button>
			</div>
		</div>
	);
};

export default AssList;
