export function SidePanel({ mascot }) {
  return (
    <div className="side-panel">
      <div className="side-mascot">{mascot.emoji}</div>
      <div className="side-title">
        Personal
        <br />
        Pronouns
      </div>
      <div className="side-sub">
        Practice with {mascot.name}!
        <br />3 fun levels 🌟
      </div>
      <div className="side-rule" />
      <div className="side-tip">
        <strong>Quick guide:</strong>
        <br />
        I → <strong>am</strong>
        <br />
        You → <strong>are</strong>
        <br />
        He/She/It → <strong>is</strong>
        <br />
        We/They → <strong>are</strong>
        <br />
        It = things &amp; animals 🐶
      </div>
    </div>
  );
}
