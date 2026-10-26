import {
  useMemo,
  type ChangeEvent,
  type SyntheticEvent,
  type ReactNode,
} from "react";
import { LoaderCircle } from "lucide-react";
import {
  signupSchema,
  type SignupErrors,
  type SignupField,
} from "./lib/signupSchema";
import { useSignupStore } from "./stores/signupStore";

const formFields: SignupField[] = [
  "callsign",
  "email",
  "password",
  "confirmPassword",
  "terms",
];

const fieldLabels: Record<SignupField, string> = {
  callsign: "CALLSIGN",
  email: "EMAIL",
  password: "PASSWORD",
  confirmPassword: "CONFIRM",
  terms: "TERMS",
};

function getStrength(password: string): number {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}

export default function App() {
  const {
    values,
    touched,
    showPassword,
    showConfirmPassword,
    status,
    setField,
    touchField,
    setStatus,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useSignupStore();

  const validation = useMemo(() => signupSchema.safeParse(values), [values]);
  const errors = useMemo<SignupErrors>(() => {
    if (validation.success) return {};

    return validation.error.issues.reduce<SignupErrors>((result, issue) => {
      const field = issue.path[0] as SignupField | undefined;
      if (field && !result[field]) result[field] = issue.message;

      return result;
    }, {});
  }, [validation]);

  const strength = getStrength(values.password);
  const scoreLabel = [
    "Awaiting input",
    "Needs work",
    "Building",
    "Strong",
    "Elite",
  ][strength];
  const strengthDisplay = ["", "WEAK", "BUILDING", "STRONG", "STRONG"][
    strength
  ];

  const completed = formFields.filter(
    (field) => Boolean(values[field]) && !errors[field],
  ).length;

  function getFieldError(field: SignupField): string {
    return touched[field] || status === "error" ? (errors[field] ?? "") : "";
  }

  function isFieldValid(field: SignupField): boolean {
    return Boolean(values[field]) && !errors[field];
  }

  function getFieldStatus(field: SignupField): string {
    if (!values[field]) return field === "terms" ? "REQUIRED" : "PENDING";
    if (!errors[field]) return "OK";
    if (field === "callsign") {
      return values.callsign.length < 3 ? "TOO SHORT" : "MALFORMED";
    }
    if (field === "email") return "MALFORMED";
    if (field === "password") return "TOO SHORT";
    if (field === "confirmPassword") return "MISMATCH";
    return "REQUIRED";
  }

  function renderError(field: SignupField): ReactNode {
    const message = getFieldError(field);
    if (!message) return null;

    return (
      <span className="error-content">
        <img src="/icon-alert.svg" />
        {message}
      </span>
    );
  }

  function updateField(event: ChangeEvent<HTMLInputElement>): void {
    const { name, type, value, checked } = event.target;
    setField(name as SignupField, type === "checkbox" ? checked : value);
  }

  function blurField(event: ChangeEvent<HTMLInputElement>): void {
    touchField(event.target.name as SignupField);
  }

  function submitForm(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();
    formFields.forEach(touchField);

    if (!validation.success) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <main className="app-sell success-shell">
        <div className="absolute right-0">
          <img src="/pattern-backdrop.svg" />
        </div>

        <div className="page-layout success-layout">
          <section className="intro-panel">
            <img src="/logo.svg" />

            <div className="intro-copy">
              <p className="signal-title">
                <span>//</span> JOIN THE NEXUS
              </p>
              <p className="subtitle">INITIALIZE YOUR NEONCORE IDENTITY</p>
            </div>

            <div className="operator-status">
              <div className="status-heading">
                <span>OPERATOR ID</span>
                <span className="status-ok">PROVISIONED</span>
              </div>
              <strong>{values.callsign.toUpperCase()}</strong>

              <div className="status-list">
                {formFields.map((field) => (
                  <div key={field}>
                    <span>{fieldLabels[field]}</span>
                    <i />
                    <span className="status-locked">LOCKED</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="form-card success-card" aria-live="polite">
            <div className="card-corner top-corner" aria-hidden="true" />
            <div className="card-corner bottom-corner" aria-hidden="true" />
            <div className="success-icon">
              <img src="/icon-hex-check.svg" />
            </div>
            <h1>
              <span>//</span> HANDSHAKE COMPLETE
            </h1>
            <p className="success-copy">
              Operator <strong>{values.callsign}</strong> provisioned. Your
              account is ready.
            </p>
            <a className="submit-button success-continue" href="#login">
              CONTINUE TO LOG IN
            </a>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="absolute right-0">
        <img src="/pattern-backdrop.svg" />
      </div>

      <div className="page-layout">
        <section className="intro-panel">
          <img src="/logo.svg" />

          <div className="intro-copy">
            <p className="signal-title">
              <span>//</span> JOIN THE NEXUS
            </p>
            <p className="subtitle">INITIALIZE YOUR NEONCORE IDENTITY</p>
          </div>

          <div className="operator-status">
            <div className="status-heading">
              <span>OPERATOR ID</span>
              <span className="ready-count">{completed}/5&nbsp; READY</span>
            </div>

            <strong>
              {completed === 5 ? values.callsign.toUpperCase() : "UNASSIGNED"}
            </strong>

            <div className="status-list">
              {formFields.map((field) => (
                <div key={field}>
                  <span>{fieldLabels[field]}</span>
                  <i />
                  <span
                    className={
                      isFieldValid(field)
                        ? "status-ok"
                        : errors[field]
                          ? "status-error"
                          : ""
                    }
                  >
                    {getFieldStatus(field)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="form-card" aria-labelledby="form-title">
          <div className="card-corner top-corner" aria-hidden="true" />
          <div className="card-corner bottom-corner" aria-hidden="true" />

          <div className="form-header">
            <span id="form-title">NEW OPERATOR</span>
            <span>ALL FIELDS REQUIRED</span>
          </div>

          <form onSubmit={submitForm} noValidate>
            <div className="field-group">
              <label htmlFor="callsign">
                <span>&gt;</span> CALLSIGN
              </label>
              <div className="input-wrap">
                <input
                  id="callsign"
                  name="callsign"
                  className={isFieldValid("callsign") ? "valid-input" : ""}
                  value={values.callsign}
                  onChange={updateField}
                  onBlur={blurField}
                  placeholder="e.g Vortex_07"
                  autoComplete="username"
                  aria-invalid={Boolean(getFieldError("callsign"))}
                  aria-describedby="callsign-hint callsign-error"
                />
                {isFieldValid("callsign") && (
                  <img src="/icon-tick-20.svg" className="field-valid-icon" />
                )}
              </div>

              <p className="hint" id="callsign-hint">
                3-20 characters: letters, numbers, _, or -
              </p>
              <p className="error" id="callsign-error" role="alert">
                {renderError("callsign")}
              </p>
            </div>

            <div className="field-group">
              <label htmlFor="email">
                <span>&gt;</span> EMAIL
              </label>
              <div className="input-wrap">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={isFieldValid("email") ? "valid-input" : ""}
                  value={values.email}
                  onChange={updateField}
                  onBlur={blurField}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(getFieldError("email"))}
                  aria-describedby="email-error"
                />
                {isFieldValid("email") && (
                  <img src="/icon-tick-20.svg" className="field-valid-icon" />
                )}
              </div>
              <p className="error" id="email-error" role="alert">
                {renderError("email")}
              </p>
            </div>

            <div className="field-group">
              <label htmlFor="password">
                <span>&gt;</span> PASSWORD
              </label>
              <div className="input-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={updateField}
                  onBlur={blurField}
                  autoComplete="new-password"
                  className={isFieldValid("password") ? "valid-input" : ""}
                  aria-invalid={Boolean(getFieldError("password"))}
                  aria-describedby="password-hint password-error"
                />
                {isFieldValid("password") && (
                  <img
                    src="/icon-tick-20.svg"
                    className="field-valid-icon password-valid-icon"
                  />
                )}
                <button
                  className="icon-button"
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <img src="/icon-eye-off.svg" />
                  ) : (
                    <img src="/icon-eye.svg" />
                  )}
                </button>
              </div>

              <div
                className="strength-meter"
                aria-label={`Password strength: ${scoreLabel}`}
                role="meter"
                aria-valuemin={0}
                aria-valuemax={4}
                aria-valuenow={strength}
              >
                {[0, 1, 2, 3].map((bar) => (
                  <span
                    key={bar}
                    className={
                      bar < strength ? `filled strength-${strength}` : ""
                    }
                  />
                ))}
              </div>
              <p className="hint strength-hint" id="password-hint">
                <span>At least 8 characters</span>
                {values.password && (
                  <strong className={`strength-status strength-${strength}`}>
                    {strengthDisplay}
                  </strong>
                )}
              </p>
              <p className="error" id="password-error" role="alert">
                {renderError("password")}
              </p>
            </div>

            <div className="field-group">
              <label htmlFor="confirmPassword">
                <span>&gt;</span> CONFIRM PASSWORD
              </label>
              <div className="input-wrap">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={updateField}
                  onBlur={blurField}
                  autoComplete="new-password"
                  className={
                    isFieldValid("confirmPassword") ? "valid-input" : ""
                  }
                  aria-invalid={Boolean(getFieldError("confirmPassword"))}
                  aria-describedby="confirm-error"
                />
                {isFieldValid("confirmPassword") && (
                  <img src="/icon-tick-20.svg" className="field-valid-icon" />
                )}
                <button
                  className="icon-button"
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                >
                  {showConfirmPassword ? (
                    <img src="/icon-eye-off.svg" />
                  ) : (
                    <img src="/icon-eye.svg" />
                  )}
                </button>
              </div>
              <p className="error" id="confirm-error" role="alert">
                {renderError("confirmPassword")}
              </p>
            </div>

            <div className="terms-row">
              <span className="checkbox-wrap">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={values.terms}
                  onChange={updateField}
                  onBlur={blurField}
                  aria-invalid={Boolean(getFieldError("terms"))}
                  aria-describedby="terms-error"
                />
                {values.terms && (
                  <img src="/icon-tick-16.svg" className="terms-check" />
                )}
              </span>

              <label htmlFor="terms">
                I accept the <a href="#terms">Terms</a> and{" "}
                <a href="#privacy">Privacy Policy</a>.
              </label>
            </div>

            <p className="error terms-error" id="terms-error" role="alert">
              {renderError("terms")}
            </p>

            <button
              className="submit-button"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <LoaderCircle className="spin" size={18} /> TRANSMITTING
                </>
              ) : (
                "INITIALIZE ACCOUNT"
              )}
            </button>

            <p className="login-prompt">
              Already an operator? <a href="#login">Log in</a>
            </p>
            <p className="form-status" role="status" aria-live="polite">
              {status === "error"
                ? "CHECK THE HIGHLIGHTED FIELDS TO CONTINUE."
                : ""}
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
