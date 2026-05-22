import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatHotelPrice, getHotelDetailUrl, type Hotel } from "@/lib/data";

type HotelCardProps = {
  hotel: Hotel;
};

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={hotel.images[0].url}
          alt={hotel.images[0].alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {hotel.isFeatured ? (
          <Badge className="absolute left-3 top-3" variant="default">
            精選
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold leading-7">
              <Link href={getHotelDetailUrl(hotel)}>{hotel.name}</Link>
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {hotel.city.name}・{hotel.district}
            </p>
          </div>
          {hotel.rating ? (
            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-700">
              <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              {hotel.rating.toFixed(1)}
            </span>
          ) : null}
        </div>
        <p className="mt-4 font-semibold text-primary">{formatHotelPrice(hotel)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[...hotel.services, ...hotel.petTypes].slice(0, 5).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Button className="mt-5 w-full" asChild>
          <Link href={getHotelDetailUrl(hotel)}>查看店家資訊</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
