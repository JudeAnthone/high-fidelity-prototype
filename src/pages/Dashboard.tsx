import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const upcomingTasks = [
	{
		id: 1,
		title: "HCI Prototype Submission",
		dueDate: "Jan 10",
		priority: "High",
		course: "Human-Computer Interaction",
	},
	{
		id: 2,
		title: "Software Engineering Defense",
		dueDate: "Jan 12",
		priority: "Medium",
		course: "Software Engineering",
	},
	{
		id: 3,
		title: "Software Engineering Report",
		dueDate: "Jan 16",
		priority: "Low",
		course: "Software Engineering",
	},
];

const Dashboard = () => {
	const navigate = useNavigate();

	const getPriorityStyles = (priority: string) => {
		switch (priority) {
			case "High":
				return { dot: "bg-rose-400", badge: "bg-rose-50 text-rose-600 border-rose-100 font-semibold" };
			case "Medium":
				return {
					dot: "bg-amber-400",
					badge: "bg-amber-50 text-amber-600 border-amber-100 font-semibold",
				};
			default:
				return {
					dot: "bg-emerald-400",
					badge: "bg-emerald-50 text-emerald-600 border-emerald-100 font-semibold",
				};
		}
	};

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good morning";
		if (hour < 18) return "Good afternoon";
		return "Good evening";
	};

	return (
		<div className="max-w-md mx-auto px-5 py-8 min-h-screen">
			{/* Enhanced Header */}
			<div className="relative -mx-5 mb-8">
				<div className="bg-gradient-to-br from-indigo-500 to-indigo-400 rounded-b-3xl px-5 pt-8 pb-8 shadow-sm">
					<p className="text-indigo-100 text-base font-medium opacity-90">{getGreeting()},</p>
					<h1 className="text-2xl font-bold text-white mt-1 drop-shadow-sm">
						Welcome back, Jude!
					</h1>
				</div>
				{/* Profile Avatar */}
				<div className="absolute right-7 top-8 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center shadow-md backdrop-blur border-2 border-white">
					<svg
						className="w-6 h-6 text-indigo-500"
						fill="none"
						stroke="currentColor"
						strokeWidth={2.5}
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<circle cx="12" cy="8" r="4" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
					</svg>
				</div>
			</div>

			{/* Summary Cards */}
			<section className="grid grid-cols-2 gap-3 mb-8">
				<div
					className="bg-white rounded-2xl p-4 border border-stone-100 animate-fade-in-up"
					style={{ animationDelay: "80ms" }}
				>
					<p className="text-3xl font-bold text-stone-800">{upcomingTasks.length}</p>
					<p className="text-stone-500 text-base font-medium mt-0.5">Upcoming</p>
				</div>

				<div
					className="bg-white rounded-2xl p-4 border border-stone-100 animate-fade-in-up"
					style={{ animationDelay: "140ms" }}
				>
					<p className="text-3xl font-bold text-stone-800">
						{upcomingTasks.filter((t) => t.priority === "High").length}
					</p>
					<p className="text-stone-500 text-base font-medium mt-0.5">High Priority</p>
				</div>
			</section>

			{/* Upcoming Tasks */}
			<section className="mb-8">
				<div
					className="flex items-center justify-between mb-4 animate-fade-in"
					style={{ animationDelay: "200ms" }}
				>
					<h2 className="text-sm font-bold text-stone-500 uppercase tracking-wider">
						Due Soon
					</h2>
					<button
						onClick={() => navigate("/assignments")}
						className="text-indigo-500 text-base font-semibold hover:text-indigo-600 transition-colors"
					>
						See all
					</button>
				</div>

				<div className="space-y-3 stagger-children">
					{upcomingTasks.map((task) => {
						const styles = getPriorityStyles(task.priority);
						return (
							<div
								key={task.id}
								className="bg-white rounded-xl p-4 border border-stone-100 transition-all duration-200 hover:border-stone-200 hover:shadow-sm animate-fade-in-up press-effect cursor-pointer"
							>
								<div className="flex items-start gap-3">
									<div
										className={`w-2.5 h-2.5 rounded-full mt-1.5 ${styles.dot} animate-pulse-soft`}
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between gap-2">
											<h3 className="font-semibold text-stone-800 text-base leading-snug">
												{task.title}
											</h3>
											<span
												className={`text-sm px-2.5 py-1 rounded-full border shrink-0 ${styles.badge}`}
											>
												{task.priority}
											</span>
										</div>
										<p className="text-stone-500 text-sm font-medium mt-1">{task.course}</p>
										<div className="flex items-center gap-1.5 mt-2">
											<span className="text-stone-500 text-sm font-medium">
												{task.dueDate}
											</span>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>

			{/* Action Buttons */}
			<section className="space-y-3 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
				<Button
					variant="contained"
					fullWidth
					onClick={() => navigate("/assignments")}
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
					View All Assignments
				</Button>

				<Button
					variant="text"
					fullWidth
					onClick={() => navigate("/add-task")}
					sx={{
						color: "#6366f1",
						textTransform: "none",
						padding: "16px 20px",
						fontSize: "16px",
						fontWeight: 600,
						borderRadius: "14px",
						backgroundColor: "#eef2ff",
						transition: "all 0.2s ease",
						"&:hover": {
							backgroundColor: "#e0e7ff",
							transform: "translateY(-2px)",
						},
						"&:active": {
							transform: "translateY(0)",
						},
					}}
				>
					+ Add New Task
				</Button>
			</section>

			{/* Bottom indicator */}
			<div
				className="flex justify-center mt-8 animate-fade-in"
				style={{ animationDelay: "500ms" }}
			>
				<div className="flex gap-1.5">
					<div className="w-6 h-1.5 rounded-full bg-indigo-400" />
					<div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
					<div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
