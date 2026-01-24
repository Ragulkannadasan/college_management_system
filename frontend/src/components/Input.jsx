import './Input.css';

const Input = ({ 
  label, 
  error, 
  required = false, 
  className = '',
  type = 'text',
  ...props 
}) => {
  const inputClass = `input-field ${error ? 'input-error' : ''} ${className}`;

  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input 
        className={inputClass}
        type={type}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;