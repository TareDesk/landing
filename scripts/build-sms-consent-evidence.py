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
    "May I send you texts from TareDesk Demo at this number while we demonstrate "
    "the normal moving-survey workflow? These include survey appointment scheduling, "
    "changes, cancellations and reminders; video-survey links; inventory review and "
    "approval requests; submission receipts and review outcomes; and replies to your "
    "questions. These are demonstration surveys, not an actual move. "
    "Message frequency varies. Message and data rates may apply. Reply STOP to opt "
    "out or HELP for help. Texting is optional and is not a condition of purchase; "
    "we can use email or shared links instead. The SMS terms are at "
    "www.taredesk.com/sms/terms and the privacy policy is at "
    "www.taredesk.com/sms/privacy. May I text you at this number?"
)

# Keep the evidence aligned with the actual published program's source text.
source = (ROOT / "src/SmsPages.tsx").read_text()
assert SCRIPT in source, "Consent script differs from the program page."

body = ParagraphStyle(
    "Body", fontName="Evidence", fontSize=10.5, leading=13.5,
    textColor=colors.HexColor("#303030"), spaceAfter=6, alignment=TA_LEFT,
)
heading = ParagraphStyle(
    "Heading", parent=body, fontName="EvidenceBold", fontSize=12,
    leading=16, textColor=colors.HexColor("#101010"), spaceBefore=9,
    spaceAfter=6,
)
title = ParagraphStyle(
    "Title", parent=heading, fontSize=23, leading=28,
    spaceBefore=0, spaceAfter=10,
)
script_style = ParagraphStyle(
    "Script", parent=body, fontSize=11, leading=14.5,
    leftIndent=12, rightIndent=12, spaceBefore=6, spaceAfter=9,
)

story = [
    Paragraph("TareDesk Demo", title),
    Paragraph("Verbal SMS consent process", heading),
    Paragraph(
        "Operator: Conor Doyle<br/>"
        "Support: conor@merrimackdata.com<br/>"
        "Disclosure version: November 5, 2026", body,
    ),
    Paragraph("Who opts in", heading),
    Paragraph(
        "Prospective customers experience the normal moving-survey workflow in "
        "Conor-operated demonstrations, using demo surveys rather than actual moves. "
        "Consent covers appointments and reminders, video links, inventory review "
        "and approval, submission receipts and review outcomes, and two-way support. "
        "Conor obtains permission "
        "during a phone call or demonstration intake, before the first text.", body,
    ),
    Paragraph("Exact script read to the participant", heading),
    Paragraph(SCRIPT, script_style),
    Paragraph(
        'Illustrative exchange: Participant: "Yes." Conor: "You\'re enrolled in '
        'TareDesk Demo survey-workflow texts. Reply STOP to opt out or HELP for help." '
        'A "no" or no answer means no SMS.', body,
    ),
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
        "This process document contains no recipient information or proof of "
        "individual consent.", body,
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
