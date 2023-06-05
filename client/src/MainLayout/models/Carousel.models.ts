export interface CarouselCard {
  event: string,
  tags: string[],
  date: Date | { from: Date; to: Date },
  link: string
}
