export const SoMeLink = ({ href, src, alt }) => {
  return (
    <a href={href}>
      <img className="some-link-icon" src={src} alt={alt} />
    </a>
  )
}