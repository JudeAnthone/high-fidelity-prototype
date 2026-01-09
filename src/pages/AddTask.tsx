import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const AddTask = () => {
	const navigate = useNavigate();
	const [taskName, setTaskName] = useState("");
	const [course, setCourse] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [priority, setPriority] = useState("Medium");
	const [isSaving, setIsSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	const handleSave = () => {
		setIsSaving(true);
		setTimeout(() => {
			setIsSaving(false);
			setSaved(true);
			setTimeout(() => navigate("/"), 1500);
		}, 800);
	};

	const isFormValid = taskName.trim() !== "" && dueDate !== "";

	// Success State
	if (saved) {
		return (
			<div className="max-w-md mx-auto px-5 py-6 min-h-screen flex flex-col items-center justify-center bg-stone-50">
				<div className="text-center">
					<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-scale-in">
						<span className="text-4xl animate-checkmark">✓</span>
					</div>
					<h2
						className="text-2xl font-bold text-stone-800 animate-fade-in-up"
						style={{ animationDelay: "200ms" }}
					>
						Task Added!
					</h2>
					<p
						className="text-stone-500 text-base font-medium mt-2 animate-fade-in-up"
						style={{ animationDelay: "300ms" }}
					>
						Returning to dashboard...
					</p>

					{/* Loading dots */}
					<div
						className="flex justify-center gap-1.5 mt-6 animate-fade-in"
						style={{ animationDelay: "400ms" }}
					>
						<div
							className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-soft"
							style={{ animationDelay: "0ms" }}
						/>
						<div
							className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-soft"
							style={{ animationDelay: "200ms" }}
						/>
						<div
							className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-soft"
							style={{ animationDelay: "400ms" }}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-md mx-auto px-5 py-6 min-h-screen pb-36">
			{/* Header */}
			<header className="mb-8 animate-fade-in-up">
				<button
					onClick={() => navigate(-1)}
					className="text-stone-500 text-base font-bold mb-4 flex items-center gap-1 hover:text-stone-800 transition-colors press-effect"
				>
					← Back
				</button>
				<h1 className="text-2xl font-bold text-stone-800">New Task</h1>
				<p className="text-stone-500 text-base font-medium mt-1">
					Add a new assignment or deadline
				</p>
			</header>

			{/* Form */}
			<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
				{/* Task Name */}
				<div className="animate-fade-in-up" style={{ animationDelay: "50ms" }}>
					<label
						htmlFor="taskName"
						className="block text-base font-bold text-stone-600 mb-2"
					>
						Task name <span className="text-rose-400">*</span>
					</label>
					<input
						type="text"
						id="taskName"
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						placeholder="What needs to be done?"
						className="w-full px-4 py-3.5 rounded-xl border-2 border-stone-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-base font-medium text-stone-700 bg-white placeholder-stone-400"
					/>
				</div>

				{/* Course */}
				<div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
					<label
						htmlFor="course"
						className="block text-base font-bold text-stone-600 mb-2"
					>
						Course
					</label>
					<input
						type="text"
						id="course"
						value={course}
						onChange={(e) => setCourse(e.target.value)}
						placeholder="e.g., Human-Computer Interaction"
						className="w-full px-4 py-3.5 rounded-xl border-2 border-stone-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-base font-medium text-stone-700 bg-white placeholder-stone-400"
					/>
				</div>

				{/* Due Date */}
				<div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
					<label
						htmlFor="dueDate"
						className="block text-base font-bold text-stone-600 mb-2"
					>
						Due date <span className="text-rose-400">*</span>
					</label>
					<input
						type="date"
						id="dueDate"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						className="w-full px-4 py-3.5 rounded-xl border-2 border-stone-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all text-base font-medium text-stone-700 bg-white"
					/>
				</div>

				{/* Priority */}
				<div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
					<label className="block text-base font-bold text-stone-600 mb-3">
						Priority
					</label>
					<div className="flex gap-2">
						{[
							{level: 'Low', color: 'emerald'},
							{level: 'Medium', color: 'amber'},
							{level: 'High', color: 'rose'}
						].map(({ level, color }) => (
							<button
								key={level}
								type="button"
								onClick={() => setPriority(level)}
								className={`flex-1 py-3 rounded-xl text-base font-semibold transition-all duration-200 press-effect flex items-center justify-center gap-2 ${
									priority === level
										? color === "rose"
											? "bg-rose-50 text-rose-600 border-2 border-rose-200 shadow-sm"
											: color === "amber"
											? "bg-amber-50 text-amber-600 border-2 border-amber-200 shadow-sm"
											: "bg-emerald-50 text-emerald-600 border-2 border-emerald-200 shadow-sm"
										: "bg-stone-100 text-stone-500 border-2 border-transparent hover:bg-stone-200"
								}`}
							>
								{level}
							</button>
						))}
					</div>
				</div>

				{/* Preview Card */}
				{taskName && (
					<div className="animate-scale-in">
						<p className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">
							Preview
						</p>
						<div className="bg-white rounded-xl p-4 border border-stone-100">
							<div className="flex items-start gap-3">
								<div
									className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
										priority === "High"
											? "bg-rose-400"
											: priority === "Medium"
											? "bg-amber-400"
											: "bg-emerald-400"
									}`}
								/>
								<div className="flex-1">
									<h3 className="font-semibold text-stone-800 text-base">
										{taskName}
									</h3>
									{course && (
										<p className="text-stone-500 text-sm font-medium mt-1">
											{course}
										</p>
									)}
									{dueDate && (
										<p className="text-stone-500 text-sm font-medium mt-2">
											📅{" "}
											{new Date(dueDate).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											})}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</form>

			{/* Action Buttons */}
			<div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent pt-6 pb-6 px-5">
				<div className="max-w-md mx-auto flex gap-3">
					<Button
						variant="text"
						onClick={() => navigate(-1)}
						sx={{
							flex: 1,
							color: "#57534e",
							textTransform: "none",
							padding: "16px 20px",
							fontSize: "16px",
							fontWeight: 600,
							borderRadius: "14px",
							backgroundColor: "#f5f5f4",
							transition: "all 0.2s ease",
							"&:hover": {
								backgroundColor: "#e7e5e4",
							},
							"&:active": {
								transform: "scale(0.98)",
							},
						}}
					>
						Cancel
					</Button>

					<Button
						variant="contained"
						onClick={handleSave}
						disabled={!isFormValid || isSaving}
						sx={{
							flex: 2,
							backgroundColor: "#6366f1",
							textTransform: "none",
							padding: "16px 20px",
							fontSize: "16px",
							fontWeight: 600,
							borderRadius: "14px",
							boxShadow: isFormValid ? "0 4px 20px rgba(99, 102, 241, 0.3)" : "none",
							transition: "all 0.2s ease",
							"&:hover": {
								backgroundColor: "#4f46e5",
								boxShadow: "0 6px 24px rgba(99, 102, 241, 0.4)",
								transform: "translateY(-2px)",
							},
							"&:active": {
								transform: "translateY(0)",
							},
							"&:disabled": {
								backgroundColor: "#e7e5e4",
								color: "#a8a29e",
								boxShadow: "none",
							},
						}}
					>
						{isSaving ? (
							<span className="flex items-center gap-2">
								<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								Saving...
							</span>
						) : (
							"Save Task"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddTask;
