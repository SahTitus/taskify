export const Button = ({ label, type, onClick, icon, styles, arialLabel, isDropdown }) => {
	return (
		<button
			className={styles}
			onClick={onClick}
			aria-label={arialLabel ?? label}
			type={type}
		>
			{/* Background effect on hover, only if not a dropdown */}
			{!isDropdown && <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
			<div className={`flex items-center ${!isDropdown ? 'space-x-2' : ''}`}>
				{icon && icon}
				<span className="font-medium">{label}</span>
			</div>
		</button>
	)
}
