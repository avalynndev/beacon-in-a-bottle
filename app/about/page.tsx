export default function AboutPage() {
  return (
    <section className="relative w-full px-6 py-24 rounded-2xl border-[0.5] leading-relaxed">
      <div className="max-w-screen-md mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            What&apos;s Beacon in a Bottle?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You write a message, send it out, and it floats around until someone
            random finds it. Kind of like throwing a bottle into the ocean, but
            digital. Each message is just a small way to connect with someone
            you&apos;ve never met.
          </p>
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            How Does It Work?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            You can grab messages from other people, reply back if you want, or
            just let them keep floating. Each bottle is basically a little
            message traveling between strangers across the internet.
          </p>
        </div>

        <div className="text-left">
          <h2 className="text-3xl font-semibold mb-8 text-center bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            📜 Pages You Can Visit
          </h2>

          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="border border-border/50 rounded-lg p-5 bg-card/30">
              <h3 className="text-xl font-semibold mb-2 text-sky-400">Home</h3>
              <p className="text-muted-foreground">
                Watch bottles floating around. Click on one to read it or write
                a reply.
              </p>
            </div>

            <div className="border border-border/50 rounded-lg p-5 bg-card/30">
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                Discover
              </h3>
              <p className="text-muted-foreground">
                Check out messages people from all over the world have sent. You
                never know what you&apos;ll find.
              </p>
            </div>

            <div className="border border-border/50 rounded-lg p-5 bg-card/30">
              <h3 className="text-xl font-semibold mb-2 text-teal-400">
                Inbox
              </h3>
              <p className="text-muted-foreground">
                See bottles you&apos;ve gotten or ones you&apos;ve replied to.
                All your conversations in one place.
              </p>
            </div>

            <div className="border border-border/50 rounded-lg p-5 bg-card/30">
              <h3 className="text-xl font-semibold mb-2 text-sky-400">
                Bottle Page
              </h3>
              <p className="text-muted-foreground">
                Read one bottle&apos;s complete message. See what that person
                wanted to share.
              </p>
            </div>

            <div className="border border-border/50 rounded-lg p-5 bg-card/30">
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                Profile
              </h3>
              <p className="text-muted-foreground">
                Look at what you&apos;ve been up to and customize your account
                however you like.
              </p>
            </div>

            <div className="border border-border/50 rounded-lg p-5 bg-card/30">
              <h3 className="text-xl font-semibold mb-2 text-teal-400">
                Settings
              </h3>
              <p className="text-muted-foreground">
                Change your settings, and other stuff to make the site work
                better for you.
              </p>
            </div>

            <div className="border border-border/50 rounded-lg p-5 bg-card/30">
              <h3 className="text-xl font-semibold mb-2 text-sky-400">About</h3>
              <p className="text-muted-foreground">
                Learn more about how Beacon works and why we made it.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center border-t border-border/50 pt-12">
          <p className="text-xl text-muted-foreground italic">
            &quot;In the vastness of the digital ocean, <br />
            every beacon finds its shore.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
