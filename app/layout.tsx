import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Nav, NavLink } from "@/components/Nav";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "next-blog",
  description: "An always-free blog site",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const islogged = false;
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        <div>
          {!islogged ? (
            <div className="backdrop-blur-lg sticky top-0 border-b-[1.5px] border-black">
              <Nav>
                <div>
                  <svg
                    viewBox="0 0 3940 610"
                    className="bs q"
                    style={{ width: 150 }}
                  >
                    <path d="M594.79 308.2c0 163.76-131.85 296.52-294.5 296.52S5.8 472 5.8 308.2 137.65 11.69 300.29 11.69s294.5 132.75 294.5 296.51M917.86 308.2c0 154.16-65.93 279.12-147.25 279.12s-147.25-125-147.25-279.12S689.29 29.08 770.61 29.08s147.25 125 147.25 279.12M1050 308.2c0 138.12-23.19 250.08-51.79 250.08s-51.79-112-51.79-250.08 23.19-250.08 51.8-250.08S1050 170.09 1050 308.2M1862.77 37.4l.82-.18v-6.35h-167.48l-155.51 365.5-155.51-365.5h-180.48v6.35l.81.18c30.57 6.9 46.09 17.19 46.09 54.3v434.45c0 37.11-15.58 47.4-46.15 54.3l-.81.18V587H1327v-6.35l-.81-.18c-30.57-6.9-46.09-17.19-46.09-54.3V116.9L1479.87 587h11.33l205.59-483.21V536.9c-2.62 29.31-18 38.36-45.68 44.61l-.82.19v6.3h213.3v-6.3l-.82-.19c-27.71-6.25-43.46-15.3-46.08-44.61l-.14-445.2h.14c0-37.11 15.52-47.4 46.08-54.3m97.43 287.8c3.49-78.06 31.52-134.4 78.56-135.37 14.51.24 26.68 5 36.14 14.16 20.1 19.51 29.55 60.28 28.09 121.21zm-2.11 22h250v-1.05c-.71-59.69-18-106.12-51.34-138-28.82-27.55-71.49-42.71-116.31-42.71h-1c-23.26 0-51.79 5.64-72.09 15.86-23.11 10.7-43.49 26.7-60.45 47.7-27.3 33.83-43.84 79.55-47.86 130.93-.13 1.54-.24 3.08-.35 4.62s-.18 2.92-.25 4.39a332.64 332.64 0 0 0-.36 21.69C1860.79 507 1923.65 600 2035.3 600c98 0 155.07-71.64 169.3-167.8l-7.19-2.53c-25 51.68-69.9 83-121 79.18-69.76-5.22-123.2-75.95-118.35-161.63m532.69 157.68c-8.2 19.45-25.31 30.15-48.24 30.15s-43.89-15.74-58.78-44.34c-16-30.7-24.42-74.1-24.42-125.51 0-107 33.28-176.21 84.79-176.21 21.57 0 38.55 10.7 46.65 29.37zm165.84 76.28c-30.57-7.23-46.09-18-46.09-57V5.28L2424.77 60v6.7l1.14-.09c25.62-2.07 43 1.47 53.09 10.79 7.9 7.3 11.75 18.5 11.75 34.26v71.14c-18.31-11.69-40.09-17.38-66.52-17.38-53.6 0-102.59 22.57-137.92 63.56-36.83 42.72-56.3 101.1-56.3 168.81C2230 518.72 2289.53 600 2378.13 600c51.83 0 93.53-28.4 112.62-76.3V588h166.65v-6.66zm159.29-505.33c0-37.76-28.47-66.24-66.24-66.24-37.59 0-67 29.1-67 66.24s29.44 66.24 67 66.24c37.77 0 66.24-28.48 66.24-66.24m43.84 505.33c-30.57-7.23-46.09-18-46.09-57h-.13V166.65l-166.66 47.85v6.5l1 .09c36.06 3.21 45.93 15.63 45.93 57.77V588h166.8v-6.66zm427.05 0c-30.57-7.23-46.09-18-46.09-57V166.65L3082 212.92v6.52l.94.1c29.48 3.1 38 16.23 38 58.56v226c-9.83 19.45-28.27 31-50.61 31.78-36.23 0-56.18-24.47-56.18-68.9V166.66l-166.66 47.85V221l1 .09c36.06 3.2 45.94 15.62 45.94 57.77v191.27a214.48 214.48 0 0 0 3.47 39.82l3 13.05c14.11 50.56 51.08 77 109 77 49.06 0 92.06-30.37 111-77.89v66h166.66v-6.66zM3934.2 588v-6.67l-.81-.19c-33.17-7.65-46.09-22.07-46.09-51.43v-243.2c0-75.83-42.59-121.09-113.93-121.09-52 0-95.85 30.05-112.73 76.86-13.41-49.6-52-76.86-109.06-76.86-50.12 0-89.4 26.45-106.25 71.13v-69.87l-166.66 45.89v6.54l1 .09c35.63 3.16 45.93 15.94 45.93 57V588h155.5v-6.66l-.82-.2c-26.46-6.22-35-17.56-35-46.66V255.72c7-16.35 21.11-35.72 49-35.72 34.64 0 52.2 24 52.2 71.28V588h155.54v-6.66l-.82-.2c-26.46-6.22-35-17.56-35-46.66v-248a160.45 160.45 0 0 0-2.2-27.68c7.42-17.77 22.34-38.8 51.37-38.8 35.13 0 52.2 23.31 52.2 71.28V588z"></path>
                  </svg>
                </div>
                <div className="flex items-center gap-5">
                  <NavLink href={"/f"}>Our story</NavLink>
                  <NavLink href={"/g"}>Membership</NavLink>
                  <NavLink href={"/g"}>Write</NavLink>
                  <NavLink href={"/g"}>Sign in</NavLink>
                  <Button className="rounded-3xl">Get started</Button>
                </div>
              </Nav>
            </div>
          ) : (
            <Nav>
              <NavLink href={"/f"}>Our story</NavLink>
              <NavLink href={"/g"}>Membership</NavLink>
              <NavLink href={"/g"}>Write</NavLink>
              <NavLink href={"/g"}>Sign in</NavLink>
            </Nav>
          )}
          {/* <div className="backdrop-blur-lg sticky top-0 border-b-[1.5px] border-black">
            <Nav>
              <div>
                <Image
                  src={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAJFBMVEXm5ub////19fXp6en6+vrt7e3y8vLn5+f39/fr6+v5+fnj4+OrMcqUAAAEBElEQVR4nO3Z65KjIBCGYQ+AKPd/vwt0N6BOZg+1qU2y7/NjptCI45cG0ZkmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+RNp+tTz3FGmr/IWzPPM3zBTeLuKa+Ne1L9Ony0X0Rp2CDbNsfn8Evufd8zFrO8s3nXl0K8yD27eX6ZicN38vh+rlp2mTTwzP4Qz6Qw4pDn+/IzWf2vWuGR6mtdQhHtw+DSbaEb87hLSz3fayv7pqVpbVa0081jnaAhjVkc9twkyyscK3Kd5KOW1ZaNLE1U03U2yE2wbU+/Lz8cljT8cajMNyjyldTRl5v+tpoWYQjtoorklvOYaXLTSG3e1jTtl3vGVf9+GtP/9hXWdUcfG8tdQZvYye4vUea7fM2hlUKzw3LA3+43O5h5SVE7SpNPkreaQuHdrWEtEY3H/UmHMqBT0/g131ZWDWHODRTSacNnuCSDES9E0SXelg542Pf8/4gUdYj9zVaWHUJkbtfw6HFuddhbVsW/ZKOZHPmUxd/vyPdZ3exnfbUMrNCKmHJFWmtzb6H5fsYtuzq5KbDUEOzDkpYwb4P2XW4sMguF2TX68xwD7LK1z+2VrvmKoelx0kzV4WFtVq9xbkvQUv52Jwla7qSp4Wl4z1Pa1F36bpvtxvyq5TW/iis5RSjv4Q1STpSPOWnhlVvrbUAQ+1DbrWl3SZ4b4k4C2vVsKTGlnFL/9ArGGbxs3gOK1zD0gkllS6mFlbZWtew0rFMO3VY/kFYpZvPCEuXZ76sGyYLq46fuK3ruklYfQX60WH9bBhOtnrY65SiYQ13UOfcLNdaLv8jwlrnB8IprP0elt4A8qKojDIN66g/O+1q+oywTve8UzynPTqq9KAalt7yo1yKhuWskMbeP6ay9K52V5/hGlmUnsOy0kutG6ks159QJKGPmbMejcNwWtvLavqwYzSsYfVgYdVf7c2ertU+5m44jXPyqbDGGEMtoza+NKx+SS0sS0L221NRPc8nhPX1Gr6uufvzjjSGVzT1Vx10mqCus+SNaS3BXIxBl+LjCv7Nw/piER/6utL+/mV46gj2pnluG+1xR+s0eB/L1a6tTm9hyZy4JPsD3iOse1r6vqC9FiwNP0zcFlbqQ87C2sZuWhfO78ctLH0VvXr3TmHlyeWUVf9/jrRlwo7tT84J6CeCXYeEEtO4ypXHntapdW2PzX2XfFmbvXFOt7DCS70BTL7HtYw7csEc12f+8irFaUiamtbNHPeevF7h5rRl1dbfzWhF76t9R4v9AbLF7fb/gfgq7x1EeXt5HEf4CxWf9rAM/dTmg/+q+vA3TggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8134AvcQb1uS0xEYAAAAASUVORK5CYII="
                  }
                  alt="logo"
                  width={100}
                  height={40}
                />
              </div>
              <div className="flex items-center gap-5">
                <NavLink href={"/f"}>Our story</NavLink>
                <NavLink href={"/g"}>Membership</NavLink>
                <NavLink href={"/g"}>Write</NavLink>
                <NavLink href={"/g"}>Sign in</NavLink>
                <Button className="rounded-3xl">Get started</Button>
              </div>
            </Nav>
          </div> */}
          {children}
        </div>
      </body>
    </html>
  );
}
