"""Build the public, non-personal verbal-consent evidence document."""

from pathlib import Path
from shutil import copyfile

import reportlab
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output/pdf/taredesk-demo-verbal-consent.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
font_dir = Path(reportlab.__file__).parent / "fonts"
pdfmetrics.registerFont(TTFont("Evidence", str(font_dir / "Vera.ttf")))
pdfmetrics.registerFont(TTFont("EvidenceBold", str(font_dir / "VeraBd.ttf")))

SCRIPT = (
    "May I text this number about your requested TareDesk software demonstration, "
    "including the video invitation, demonstration report and related conversation? "
    "Message frequency varies. Message and data rates may apply. Reply STOP to opt "
    "out or HELP for help. Texting is optional and is not a condition of purchase; "
    "we can use email or shared links instead. The SMS terms and privacy policy are "
    "available on the TareDesk website. Is that okay?"
)

# Keep the evidence aligned with the actual published program's source text.
source = (ROOT / "src/SmsPages.tsx").read_text()
assert SCRIPT in source, "Consent script differs from the program page."

body = ParagraphStyle(
    "Body", fontName="Evidence", fontSize=10.5, leading=15,
    textColor=colors.HexColor("#303030"), spaceAfter=9, alignment=TA_LEFT,
)
heading = ParagraphStyle(
    "Heading", parent=body, fontName="EvidenceBold", fontSize=12,
    leading=16, textColor=colors.HexColor("#101010"), spaceBefore=12,
    spaceAfter=6,
)
title = ParagraphStyle(
    "Title", parent=heading, fontSize=23, leading=28,
    spaceBefore=0, spaceAfter=10,
)
script_style = ParagraphStyle(
    "Script", parent=body, fontSize=11, leading=16,
    leftIndent=12, rightIndent=12, spaceBefore=8, spaceAfter=12,
)

story = [
    Paragraph("TareDesk Demo", title),
    Paragraph("Verbal SMS consent process", heading),
    Paragraph(
        "Operator: Conor Doyle<br/>"
        "Support: conor@merrimackdata.com<br/>"
        "Disclosure version: October 28, 2026", body,
    ),
    Paragraph("Who opts in", heading),
    Paragraph(
        "Participants requesting a TareDesk software demonstration consent to "
        "demonstration coordination, video invitations, demonstration report "
        "links and related two-way conversation. Conor obtains permission "
        "during a phone call or demonstration intake, before the first text.", body,
    ),
    Paragraph("Exact script read to the participant", heading),
    Paragraph(SCRIPT, script_style),
    Paragraph("How the answer is recorded", heading),
    Paragraph(
        "Confirm the intended mobile number. Record consent only after an "
        "affirmative answer. The consent record identifies the mobile number, "
        "date and time, verbal collection method, disclosure version and "
        "operator. A booking or phone number by itself does not enroll anyone. "
        "If consent is declined or absent, use email or shared links.", body,
    ),
    Paragraph("Opt out and resubscribe", heading),
    Paragraph(
        "STOP suppresses further program messages, apart from the opt-out "
        "confirmation. Toll-free resubscription uses START or UNSTOP. HELP "
        "provides support and does not resubscribe a recipient. Consent and "
        "provider suppression controls must both permit sending.", body,
    ),
    Paragraph("Public program and policies", heading),
]
for label, url in [
    ("Program and verbal script", "https://www.taredesk.com/sms"),
    ("SMS terms", "https://www.taredesk.com/sms/terms"),
    ("Privacy policy", "https://www.taredesk.com/sms/privacy"),
]:
    story.append(Paragraph(f'{label}: <link href="{url}" color="#202020">{url}</link>', body))

story.extend([
    Spacer(1, 5),
    Paragraph(
        "This document explains the consent workflow. It contains no recipient "
        "information and is not evidence of consent from a particular person.", body,
    ),
])

SimpleDocTemplate(
    str(OUTPUT), pagesize=(8.5 * inch, 11 * inch),
    leftMargin=0.7 * inch, rightMargin=0.7 * inch,
    topMargin=0.55 * inch, bottomMargin=0.55 * inch,
    title="TareDesk Demo Verbal SMS Consent", author="Conor Doyle",
).build(story)

reader = PdfReader(OUTPUT)
assert len(reader.pages) == 1, "Consent evidence must fit on one readable page."
text = " ".join(" ".join(page.extract_text() for page in reader.pages).split())
for required in ["TareDesk Demo", "Conor Doyle", "STOP", "HELP", "START", "UNSTOP",
                 "Message and data rates may apply", "https://www.taredesk.com/sms/terms",
                 "https://www.taredesk.com/sms/privacy", "disclosure version"]:
    assert required in text, f"Missing evidence element: {required}"
public_copy = ROOT / "public/sms/verbal-consent.pdf"
public_copy.parent.mkdir(parents=True, exist_ok=True)
copyfile(OUTPUT, public_copy)
print(OUTPUT)
