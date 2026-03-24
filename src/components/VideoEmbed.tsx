type Props = {
  youtubeId: string
  title: string
}

export function VideoEmbed({ youtubeId, title }: Props) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-black/10">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
