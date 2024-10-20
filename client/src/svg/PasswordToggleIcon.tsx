interface IconProps {
  show: boolean;
  onClick: () => void;
}

export const PasswordToggleIcon = ({ show, onClick }: IconProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-y-0 right-0 flex items-center pr-3"
      aria-label="Toggle password visibility"
    >
      {show ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825a8.932 8.932 0 01-2.625.425c-4.419 0-8-2.6-9.743-6.2a2.05 2.05 0 010-1.65C3.25 7.6 6.831 5 11.25 5c.896 0 1.753.142 2.565.405M15 12h6m-3-3v6m-5.25 0a1.5 1.5 0 01-3 0m1.5-1.5V8.25M4.875 4.875L19.125 19.125"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.875 18.825a8.932 8.932 0 01-2.625.425c-4.419 0-8-2.6-9.743-6.2a2.05 2.05 0 010-1.65C3.25 7.6 6.831 5 11.25 5c.896 0 1.753.142 2.565.405M15 12h6m-3-3v6"
          />
        </svg>
      )}
    </button>
  );
};
