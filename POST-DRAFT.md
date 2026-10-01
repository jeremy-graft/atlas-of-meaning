# Hacker News submission draft

Not posted. Review, change anything that does not sound like you, and submit it
yourself. Posting under your own name matters here; a submission that reads as
automated gets flagged, and the HN crowd is good at spotting it.

---

## Title

Submit as a **Show HN** linking to https://atlasofmeanings.com

Options, best first:

1. `Show HN: I scraped 1.3M comments from people facing death to find what life is for`
2. `Show HN: Atlas of Meanings – what 1.3M people said life was for, without being asked`
3. `Show HN: You can measure a country's religiosity from its grief comments (r=0.83)`

The first is the most honest about what it is and sets up the method question
immediately, which is good: the method is the interesting part. The third states
the finding but reads like a press release, and HN punishes that.

Post it on a weekday morning, US Eastern. Do not post and then refresh; it either
catches or it does not.

---

## First comment (post this yourself, right after submitting)

Every survey about meaning asks the question out loud, which is why surveys
collect performances. I wanted to know what people say when nobody asks.

So I went to the places where the question asks itself. A hospice nurse's channel.
A sobriety anniversary. An emigration diary. A faith coming apart. Then I gathered
what people volunteered on the way past: 1.3M comments, 18 languages, four public
sources. Nobody in the corpus was ever asked anything.

About 692,000 of those items are from this site, which is the part you may find
either interesting or annoying. More on that at the bottom.

**The one result I would defend.** Gallup has asked people in 85 countries, to
their faces, whether religion matters in their daily life. I never asked anyone
anything. Line the two up and they rise together at r = 0.83. A second instrument
I built months later, with a different taxonomy for a different question (how
people cope when a situation will not improve), tracks the same survey at r = 0.80.
Neither was designed with the survey in view.

If that holds up, it means a culture's religiosity can be read off what its people
say to strangers at three in the morning, with no question put to anyone.

**The limits, before you find them.** n = 8 matched countries, so the interval is
wide. It is a correlation, not an agreement: Gallup puts Egypt at 97% where I put
it at 70%, because we are measuring different quantities. The rank correlation is
weaker than the linear one (0.67), so the tracking is solid but the exact ordering
is not, which is why the middle rows of the first chapter are hatched rather than
solid. A language is not a country, and the language-to-country mapping is a
judgement call that is printed in the code so you can argue with it.

**What is wrong with it.** Most of the reading was done by machines and the
machines were often wrong. One early pass reported that a fifth of the corpus
denies life has any meaning. Read properly, the true figure was zero out of eight
hundred. I also claimed for a while that humour was the most common thing people
reach for in hopeless situations; that was a regex counting the word "laugh",
which mostly caught people enjoying a video. Coded properly it is 0.3%. Both
retractions are printed on the site, in the margins, next to the claims they
replaced. There are three others.

**Since 692k items came from here, what HN says about itself.** The seams I
searched were aging (53k), burnout (45k), meaningful work (39k), the question
asked outright (35k), near-death accidents (30k), creative calling (28k), caring
for a dying parent (28k), nihilism (25k).

Two things stand out. First, this crowd is the least religious population in the
corpus by a distance: among English speakers writing here, faith is about 2% of
stated meaning, against 44% for English speakers under a hospice video. Same
language, same years. The room changes the answer more than the country does.
Second, talk of AI as a factor in whether work means anything sat at 0.4% for
fifteen years and is now 14.4%. The slope starts the month after ChatGPT shipped.
Nothing told the method that either of those events happened.

**On your comments being in it.** Everything is public, author names were hashed
at collection and the originals were never kept, and nothing here quotes more than
a line of anyone. The published dataset contains IDs and labels only, no text, so
a deleted comment stays deleted. If you object to your words being counted, say so
and I will take the HN layer out; it is one source of four and the result does not
depend on it.

Built by one person with a lot of help from Claude. The site says so in the
colophon, as does the dataset README.

---

## Prepare for these, they will come

**"n=8 is nothing."** Agree immediately and completely. The honest answer is that
it is eight because only eight languages have hand-checked labels, and the fix is
more labelling rather than more data. Do not defend it.

**"You are measuring language, not culture."** True, and it is stated on the site.
The Korea versus Japan comparison is the best answer: both modern, both rich, both
East Asian, 47% against 11%, which rules out the obvious confounds.

**"LLM labels are not ground truth."** Agree. No inter-rater reliability against
human coders has been established, and the dataset README says so in those words.
The defence is not that the labels are perfect, it is that the errors were measured
and the ones that mattered were caught and published.

**"YouTube comments are not representative."** Completely true and not a defence
anyone should attempt. The claim is not that this is a representative sample of
humanity. It is that something measurable survives all that noise and lines up with
survey data anyway.

**"Did an AI write this post?"** Say yes, that you worked on it together, and that
the finding is yours. Lying about it on this site goes badly.
